# 📋 **LAF Refactoring Plan: Strict Rules & Hierarchy**

## 🚨 **MANDATORY REFACTORING RULES**

### **Rule 1: STRICT SEPARATION OF CONCERNS**
- **Services/Hooks**: Pure business logic, no UI imports
- **Pure Components**: Only shadcn/ui + props, zero business logic
- **Containers**: Glue logic only, connects services to UI
- **NO EXCEPTIONS**: Any violation requires immediate correction

### **Rule 2: REFACTORING HIERARCHY (MUST FOLLOW ORDER)**
```
1. Service Layer Extraction    ← Start here, complete before next
2. Pure UI Component Creation  ← Only shadcn/ui primitives
3. Container Component Glue    ← Connect services to UI
4. Feature Module Organization ← Reorganize into features
5. Global State Refactoring    ← Only after all above complete
```

### **Rule 3: COMPONENT CLASSIFICATION**
- **Pure UI**: `components/pure/` - Only rendering + shadcn/ui
- **Containers**: `components/containers/` - Business logic glue
- **Services**: `services/` - Pure business logic functions
- **Hooks**: `hooks/` - React-specific business logic

### **Rule 4: FILE NAMING CONVENTION**
```
services/itemService.js           ← Pure business logic
hooks/useItemData.js             ← React business logic
components/pure/ItemDisplay/     ← Pure UI component
components/containers/ItemContainer/ ← Container component
```

### **Rule 5: ERROR & NOTIFICATION MANAGEMENT**
- **Services handle errors**: Services return Result objects `{ success: boolean, data?: any, error?: Error }`
- **No direct notifications in services**: Services never call notification functions directly
- **Container components handle notifications**: Containers translate service results to user notifications
- **Consistent error types**: Use standardized error classes for different error categories
- **User-friendly messages**: All user-facing errors must be human-readable and actionable

---

## 📊 **REFACTORING PRIORITY MATRIX**

### **HIGH PRIORITY (Start Here)**
1. **Found.jsx** (446 lines) - Most complex, biggest impact
2. **Register.jsx** (349 lines) - Second most complex
3. **ItemCard.jsx** (197 lines) - Widely used component
4. **TxButton.jsx** (134 lines) - Reusable transaction component

### **MEDIUM PRIORITY**
5. **wallet.jsx** (240 lines) - Core infrastructure
6. **MessageModal.jsx** (11,996 bytes) - Complex messaging UI

### **LOW PRIORITY**
7. Smaller components (Header, Footer, etc.)

---

## 🎯 **PHASE-BY-PHASE REFACTORING PLAN**

### **PHASE 1: Service Layer Extraction**
**Target**: Extract all business logic from components

#### **Step 1.1: Signature Service**
```bash
# Create: services/signatureService.js
```
**Extract from**: `Found.jsx` (lines 20-50), `Register.jsx` (lines 67-203)
**Functions**: `verifySignature()`, `createSignature()`, `hashSecret()`

#### **Step 1.2: Item Service**
```bash
# Create: services/itemService.js
```
**Extract from**: `ItemCard.jsx` (lines 98-123), `Found.jsx` (status logic)
**Functions**: `calculateStatus()`, `getStatusColor()`, `getStatusText()`

#### **Step 1.3: Wallet Service**
```bash
# Create: services/walletService.js
```
**Extract from**: `wallet.jsx` (lines 118-225), `Found.jsx` (wallet detection)
**Functions**: `detectWalletType()`, `getSigningMethod()`, `isWalletReady()`

#### **Step 1.4: Transaction Service**
```bash
# Create: services/transactionService.js
```
**Extract from**: `TxButton.jsx` (transaction logic), `Found.jsx` (contract calls)
**Functions**: `simulateTransaction()`, `executeTransaction()`, `waitForConfirmation()`

#### **Step 1.5: Error & Notification Service**
```bash
# Create: services/errorService.js
# Create: services/notificationService.js
```
**Extract from**: Scattered error handling and notification calls
**Functions**: `parseError()`, `handleError()`, `notifySuccess()`, `notifyError()`, `notifyLoading()`

#### **Step 1.6: Messaging Service**
```bash
# Create: services/messagingService.js
```
**Extract from**: `MessagingProvider.jsx`, `MessageModal.jsx`, XMTP/Waku logic
**Functions**: `initializeMessaging()`, `switchProvider()`, `validateRecipient()`, `formatMessage()`

#### **Step 1.7: Geolocation Service**
```bash
# Create: services/geolocationService.js
```
**Extract from**: Location handling in Register.jsx, Found.jsx
**Functions**: `getCurrentLocation()`, `validateCoordinates()`, `formatLocation()`, `calculateDistance()`

#### **Step 1.8: QR Code Service**
```bash
# Create: services/qrService.js
```
**Extract from**: QR generation logic in Register.jsx
**Functions**: `generateQRCode()`, `parseQRData()`, `validateQRFormat()`, `createQROptions()`

#### **Step 1.9: Validation Service**
```bash
# Create: services/validationService.js
```
**Extract from**: Form validation scattered across components
**Functions**: `validateSecret()`, `validateAddress()`, `validateAmount()`, `validateComment()`

#### **Step 1.10: Contract Service**
```bash
# Create: services/contractService.js
```
**Extract from**: Contract interaction patterns in multiple components
**Functions**: `prepareContractCall()`, `handleContractError()`, `formatContractData()`, `validateContractParams()`

#### **Step 1.11: Routing Service**
```bash
# Create: services/routingService.js
```
**Extract from**: Scattered route logic across components
**Functions**: `generateItemRoutes()`, `validateRouteParams()`, `getRouteConfig()`

### **PHASE 2: Pure UI Component Creation**
**Target**: Create presentation-only components using shadcn/ui

#### **Step 2.1: Item Display Components**
```bash
# Create: components/pure/ItemDisplay/ItemDisplay.jsx
# Create: components/pure/ItemStatusBadge/ItemStatusBadge.jsx
# Create: components/pure/ItemActions/ItemActions.jsx
```
**Replace**: `ItemCard.jsx` UI logic
**Uses**: Card, Badge, Button from shadcn/ui

#### **Step 2.2: Signature Components**
```bash
# Create: components/pure/SignatureForm/SignatureForm.jsx
# Create: components/pure/SignatureStatus/SignatureStatus.jsx
# Create: components/pure/QRDisplay/QRDisplay.jsx
```
**Replace**: `Found.jsx` + `Register.jsx` UI logic
**Uses**: Form, Input, Button, Dialog from shadcn/ui

#### **Step 2.3: Wallet Components**
```bash
# Create: components/pure/WalletDisplay/WalletDisplay.jsx
# Create: components/pure/WalletActions/WalletActions.jsx
# Create: components/pure/WalletStatus/WalletStatus.jsx
```
**Replace**: `Connection.jsx` UI logic
**Uses**: Card, Badge, Button, DropdownMenu from shadcn/ui

#### **Step 2.4: Transaction Components**
```bash
# Create: components/pure/TransactionButton/TransactionButton.jsx
# Create: components/pure/TransactionStatus/TransactionStatus.jsx
```
**Replace**: `TxButton.jsx` UI logic
**Uses**: Button, Progress, Alert from shadcn/ui

### **PHASE 3: Container Component Glue**
**Target**: Connect services to pure UI components

#### **Step 3.1: Item Containers**
```bash
# Create: components/containers/ItemContainer/ItemContainer.jsx
# Create: components/containers/ItemListContainer/ItemListContainer.jsx
```
**Connects**: `itemService` + `useItemData` → `ItemDisplay`

#### **Step 3.2: Signature Containers**
```bash
# Create: components/containers/SignatureContainer/SignatureContainer.jsx
# Create: components/containers/QRContainer/QRContainer.jsx
```
**Connects**: `signatureService` + `useSignature` → `SignatureForm`

#### **Step 3.3: Wallet Containers**
```bash
# Create: components/containers/WalletContainer/WalletContainer.jsx
```
**Connects**: `walletService` + `useAccount` → `WalletDisplay`

#### **Step 3.4: Transaction Containers**
```bash
# Create: components/containers/TransactionContainer/TransactionContainer.jsx
```
**Connects**: `transactionService` + `useTx` → `TransactionButton`

### **PHASE 4: Feature Module Organization**
**Target**: Reorganize into feature-based structure

#### **Step 4.1: Item Lifecycle Feature (Core Feature)**
```bash
features/item-lifecycle/
├── components/
│   ├── ItemContainer.jsx      ← Move from containers/
│   ├── ItemDisplay.jsx        ← Move from pure/
│   ├── ItemStatusBadge.jsx    ← Move from pure/
│   ├── SignatureContainer.jsx ← Move from containers/
│   ├── SignatureForm.jsx      ← Move from pure/
│   └── QRDisplay.jsx          ← Move from pure/
├── hooks/
│   ├── useItemData.js
│   ├── useItemActions.js
│   ├── useItemStatus.js
│   ├── useSignature.js
│   └── useItemLifecycle.js
├── services/
│   ├── itemService.js         ← Move from services/
│   └── signatureService.js    ← Move from services/
├── pages/
│   ├── RegisterPage.jsx       ← Refactored Register.jsx
│   ├── LostPage.jsx           ← Refactored Lost.jsx
│   ├── FoundPage.jsx          ← Refactored Found.jsx
│   └── ItemsPage.jsx          ← Refactored Items.jsx
├── routes/
│   └── itemRoutes.jsx         ← Centralized routing
└── types/
    └── item.ts
```

#### **Step 4.2: Wallet Feature**
```bash
features/wallet/
├── components/
├── hooks/
├── services/
└── providers/
    └── WalletProvider.jsx     ← Refactored wallet.jsx
```

#### **Step 4.3: Messaging Feature**
```bash
features/messaging/
├── components/
├── hooks/
├── services/
└── providers/
    └── MessagingProvider.jsx  ← Already exists
```

#### **Step 4.4: Routing Architecture**
```bash
routing/
├── AppRouter.jsx             ← Central route definitions
├── routeConfig.js            ← Route configuration
└── routeGuards.js            ← Route protection logic
```

### **PHASE 5: Global State Refactoring**
**Target**: Centralize shared state management

#### **Step 5.1: Evaluate State Management Needs**
**React Context for:**
- Provider-based state (WalletProvider, MessagingProvider)
- Simple, truly global state
- Dependency injection patterns

**Zustand for:**
- Complex state with frequent updates
- Cross-component state that needs performance optimization
- State that benefits from devtools

#### **Step 5.2: Implement Appropriate State Management**
```bash
state/
├── contexts/
│   ├── WalletContext.jsx      ← Keep as Context (provider pattern)
│   └── MessagingContext.jsx   ← Keep as Context (provider pattern)
└── stores/
    ├── notificationStore.js   ← Zustand (frequent updates)
    └── uiStore.js            ← Zustand (UI state like modals)
```

#### **Step 5.3: Centralized State Architecture**
- Use Context for providers and simple global state
- Use Zustand only when Context limitations are reached
- Document the decision criteria for future state additions

---

## 🚨 **ERROR & NOTIFICATION ARCHITECTURE**

### **Current System Analysis**
- **Notification System**: `react-hot-toast` with custom wrapper in `Notification.jsx`
- **Error Parsing**: Custom `parseError()` function for contract errors
- **Usage Pattern**: Direct `notify()` calls scattered throughout components
- **Issues**: Inconsistent error handling, business logic mixed with notifications

### **New Architecture Pattern**

#### **1. Service Layer (Pure Functions)**
```javascript
// services/signatureService.js
export class SignatureService {
  static async verifySignature(signature, secret, address) {
    try {
      const isValid = await this.performVerification(signature, secret, address);
      return { success: true, data: { isValid, signature } };
    } catch (error) {
      return { success: false, error: new SignatureError('Verification failed', error) };
    }
  }
}
```

#### **2. Error Classes (Standardized)**
```javascript
// services/errorService.js
export class AppError extends Error {
  constructor(message, code, originalError) {
    super(message);
    this.code = code;
    this.originalError = originalError;
  }
}

export class SignatureError extends AppError {}
export class WalletError extends AppError {}
export class ContractError extends AppError {}
export class NetworkError extends AppError {}
```

#### **3. Notification Service (UI Abstraction)**
```javascript
// services/notificationService.js
export class NotificationService {
  static success(message, options = {}) {
    return notify(message, 'success', options);
  }
  
  static error(error, options = {}) {
    const message = this.getErrorMessage(error);
    return notify(message, 'error', options);
  }
  
  static loading(message, options = {}) {
    return notify(message, 'loading', options);
  }
}
```

#### **4. Container Components (Error Translation)**
```javascript
// components/containers/SignatureContainer.jsx
export function SignatureContainer({ secret }) {
  const handleSign = async () => {
    const result = await SignatureService.verifySignature(signature, secret, address);
    
    if (result.success) {
      NotificationService.success('Signature verified successfully!');
      onSuccess(result.data);
    } else {
      NotificationService.error(result.error);
      onError(result.error);
    }
  };
}
```

### **Error Handling Principles**
1. **Services never notify**: Services return Result objects, never call notifications
2. **Containers translate**: Containers convert service results to user notifications
3. **User-friendly messages**: All errors have human-readable, actionable messages
4. **Error categorization**: Different error types for different failure modes
5. **Consistent patterns**: Same error handling pattern across all features

### **Implementation Priority**
- **Step 1.5a**: Create error classes and notification service
- **Step 1.5b**: Update signature service to return Result objects
- **Step 1.5c**: Update containers to handle service results
- **Step 1.5d**: Remove direct notification calls from services

---

## 🔧 **IMPLEMENTATION CHECKLIST**

### **Before Starting Each Phase:**
- [ ] Complete previous phase 100%
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Code review completed

### **For Each Component Refactor (UI/Business Logic Separation):**

#### **🏗️ STEP 1: EXTRACT BUSINESS LOGIC**
- [ ] Create service file with path alias: `@/services/[serviceName].js`
- [ ] Extract ONE function at a time to service
- [ ] **TEST**: `bun run dev` + manual verification
- [ ] **COMMIT**: "feat: extract [specific function] to [service]"
- [ ] Repeat for each function until all business logic extracted
- [ ] **FINAL TEST**: Verify service functions work in isolation
- [ ] **FINAL COMMIT**: "feat: complete [service] business logic extraction"

#### **🎨 STEP 2: CREATE PURE UI COMPONENT**
- [ ] Create pure UI component (shadcn/ui only)
  - [ ] Remove all business logic
  - [ ] Remove all hooks except UI state
  - [ ] Accept all data via props
  - [ ] Zero inline styles/classes
- [ ] **TEST**: Verify UI component renders correctly
- [ ] **COMMIT**: "feat: create pure [component] UI component"

#### **🔌 STEP 3: CREATE CONTAINER COMPONENT**
- [ ] Create container component
  - [ ] Import and use service
  - [ ] Handle all business logic
  - [ ] Pass data to pure UI component
  - [ ] Manage loading/error states
- [ ] **TEST**: Verify container connects service to UI
- [ ] **COMMIT**: "feat: create [component] container"

#### **🔄 STEP 4: MIGRATE & CLEANUP**
- [ ] Update imports in parent components
- [ ] **TEST**: Verify full functionality unchanged
- [ ] **COMMIT**: "refactor: migrate [component] to new architecture"
- [ ] Remove original component
- [ ] **TEST**: Full app functionality verification
- [ ] **COMMIT**: "cleanup: remove legacy [component]"

### **Quality Gates:**
- [ ] Zero inline styles/classes
- [ ] Zero business logic in pure components
- [ ] All services are pure functions
- [ ] All containers use hooks/services only
- [ ] shadcn/ui components used exclusively for UI

## 📋 **NEWLY DISCOVERED REFACTORING OPPORTUNITIES**

### 🏗️ **Critical Architecture Issues Found**

#### **1. Smart Wallet Integration Complexity**
- [ ] **Extract Smart Wallet Service**: `wallet.jsx` contains complex smart wallet detection logic (240 lines)
- [ ] **Simplify useSmartWalletWriteHook**: Complex transaction encoding logic should be in service
- [ ] **Unified Wallet State**: Multiple wallet state checks scattered across components

#### **2. Transaction Pattern Duplication**
- [ ] **TxButton Abstraction**: `TxButton.jsx` has complex transaction lifecycle management
- [ ] **Notification Service**: Transaction notifications are tightly coupled to TxButton
- [ ] **Transaction State Service**: Simulate → Write → Confirm pattern repeated everywhere

#### **3. Messaging Architecture Issues**
- [ ] **Provider Abstraction Leakage**: `MessagingProvider.jsx` has complex provider switching logic (173 lines)
- [ ] **Message Modal Complexity**: 329 lines with mixed UI/business logic
- [ ] **Conversation Management**: Duplicate conversation handling between XMTP/Waku

#### **4. ~~GraphQL Query Duplication~~ (MOVED TO FINAL PHASE)**
- [ ] ~~Query Service~~ → **DEFERRED**: Will tackle GraphQL optimization in final phase
- [ ] ~~Status Computation~~ → **DEFERRED**: After core services are established
- [ ] ~~Pagination Logic~~ → **DEFERRED**: Will use TanStack Query patterns

#### **5. Signature Verification Complexity**
- [ ] **Signature Service Enhancement**: `Found.jsx` has 50-line signature verification function
- [ ] **Smart Wallet Signature Handling**: ERC-1271 vs EOA logic scattered across components
- [ ] **Unified Signing Service**: `useUnifiedSigning` has complex routing logic (120 lines)

#### **6. Component Responsibility Violations**
- [ ] **Found.jsx Status Management**: 8 different status states with complex logic (446 lines)
- [ ] **ItemCard Business Logic**: Status calculation and transaction handling mixed with UI
- [ ] **Connection Component**: Dropdown logic mixed with wallet state management

#### **7. Data Layer Inconsistencies**
- [ ] **Contract Hook Wrappers**: Smart wallet hooks wrap wagmi hooks inconsistently
- [ ] **Block Context Usage**: Real-time updates mixed with manual refresh patterns
- [ ] **Cache Invalidation**: No consistent strategy for refreshing stale data

### 🔧 **Infrastructure & Configuration**
- [ ] **Config Management**: Centralize all environment variables and configuration
- [ ] **Error Handling**: Create unified error handling service
- [ ] **Constants**: Extract magic numbers and strings to constants files

### 🎨 **UI/UX Improvements**
- [ ] **Loading States**: Standardize loading indicators across components
- [ ] **Error States**: Consistent error display patterns
- [ ] **Responsive Design**: Ensure mobile-first approach consistency

### 🔄 **State Management & Data Layer**
- [ ] **TanStack Query Integration**: Leverage existing QueryClient for better data management
  - [ ] Enhance QueryClient configuration with proper defaults
  - [ ] Add React Query DevTools for development
  - [ ] Implement query keys strategy for cache management
  - [ ] Background refetching for contract data
  - [ ] Optimistic updates for transaction states
- [ ] **Global State**: Consider Zustand for complex state (already used in messaging)
- [ ] **Local Storage**: Centralize localStorage operations
- [ ] **Cache Management**: Unified caching strategy with TanStack Query

---

## 🚀 **UPDATED STARTING POINT**

**Priority Order Based on Codebase Analysis:**

1. **Begin with**: `services/signatureService.js` - Extract signature logic from Register.jsx and Found.jsx
2. **Second**: `services/walletService.js` - Extract smart wallet detection from wallet.jsx
3. **Third**: `services/transactionService.js` - Extract TxButton transaction patterns
4. **Fourth**: **TanStack Query Integration** - Enhance data layer with proper caching
5. **Final Phase**: `services/graphqlService.js` - Consolidate query patterns with TanStack Query

**First task**: Extract signature verification and creation logic to `services/signatureService.js`
**Success criteria**: Pure crypto functions moved to service, used by both Register.jsx and Found.jsx

## ⚙️ **CRITICAL REFACTORING REQUIREMENTS**

### **Path Aliases (Use Consistently):**
- `@/` → `./app/` (for app directory imports)
- `~/` → `./` (for root directory imports)
- **Example**: `import { signatureService } from '@/services/signatureService'`

### **Testing & Commit Protocol (MANDATORY):**
- ✅ **Test EVERY change** with `bun run dev`
- ✅ **Manually verify** affected functionality works
- ✅ **Check console** for errors after each change
- ✅ **Commit IMMEDIATELY** after each successful step
- ❌ **NEVER combine** multiple refactoring steps in one commit
- ❌ **NEVER proceed** if something breaks

### **Safety First Approach:**
- **ONE function at a time** - Extract single functions, not entire modules
- **Test immediately** - Run app after each extraction
- **Commit frequently** - Every successful change gets committed
- **Rollback ready** - If anything breaks, revert the last commit

## 📊 **CODEBASE ANALYSIS SUMMARY**

**Most Critical Issues Found:**
- `Found.jsx` (446 lines) - Massive component with 8 status states
- `wallet.jsx` (240 lines) - Complex smart wallet detection logic
- `utils/graphql.js` (438 lines) - 22 functions with repeated patterns
- `MessageModal.jsx` (329 lines) - Mixed UI/business logic
- `MessagingProvider.jsx` (173 lines) - Complex provider switching
- `useUnifiedSigning.js` (120 lines) - Complex signature routing

**Architecture Violations:**
- Business logic mixed with UI components
- Duplicate transaction patterns across components
- Inconsistent smart wallet handling
- No unified error handling strategy
- GraphQL queries scattered and duplicated

**Recommended Refactoring Priority:**
1. **Services First** - Extract all business logic
2. **Components Second** - Convert to pure UI components
3. **Hooks Third** - Simplify and standardize
4. **Infrastructure Last** - Unified error handling, config management

---

### **Baseline Codebase Assessment (Clean Develop Branch)**

**Current State Analysis:**
- **Register.jsx** (115 lines): Contains crypto logic, QR logic, URL logic (3 different responsibilities!)
- **Found.jsx** (92 lines): Contains notification logic (line 31) and callback logic (lines 26-35)
- **ItemCard.jsx** (136 lines): Has contract reads mixed with UI (useReadContracts)
- **Services directory**: Empty, ready for our first service

**Proper Service Separation (Respecting SRP):**
1. **SignatureService**: ONLY `generateSecretHash()`, `generateRandomSecret()` (crypto functions)
2. **UrlService**: URL generation logic (`${window.location.origin}/found/${secretHash}/${secret}`)
3. **QRService**: QR code creation and styling logic (UI-related)
4. **NotificationService**: Centralize all `notify()` calls
5. **ItemDataService**: Contract reads and data processing

**Priority Order (Based on Actual Code):**
1. Register.jsx → SignatureService (hash/secret/QR logic)
2. ItemCard.jsx → ItemService + useItemData hook (contract reads)
3. Notification standardization across components
4. Transaction logic extraction from TxButton.jsx

### **Incremental Development Approach**

**ONE CHANGE AT A TIME:**
- Extract only ONE function/feature per commit
- Test immediately after each extraction
- Never combine multiple refactoring steps in one commit
- If something breaks, we can easily revert the single change

**Testing Strategy:**
- Run `bun run dev` after each change
- Manually test the affected functionality
- Ensure no console errors or broken UI
- Only proceed to next step if current step works perfectly

**Commit Message Pattern:**
```
feat: extract [specific function] to [service name]
refactor: update [component] to use [service]
test: verify [functionality] works after refactor
```

---

## 📝 **PROGRESS TRACKING**

### **PHASE 1: Service Layer Extraction**
- [ ] Step 1.1: Signature Service
- [ ] Step 1.2: Item Service  
- [ ] Step 1.3: Wallet Service
- [ ] Step 1.4: Transaction Service

### **PHASE 2: Pure UI Component Creation**
- [ ] Step 2.1: Item Display Components
- [ ] Step 2.2: Signature Components
- [ ] Step 2.3: Wallet Components
- [ ] Step 2.4: Transaction Components

### **PHASE 3: Container Component Glue**
- [ ] Step 3.1: Item Containers
- [ ] Step 3.2: Signature Containers
- [ ] Step 3.3: Wallet Containers
- [ ] Step 3.4: Transaction Containers

### **PHASE 4: Feature Module Organization**
- [ ] Step 4.1: Item Management Feature
- [ ] Step 4.2: Registration Feature
- [ ] Step 4.3: Found Feature
- [ ] Step 4.4: Wallet Feature

### **PHASE 5: Global State Refactoring**
- [ ] Step 5.1: Create Global Stores
- [ ] Step 5.2: Migrate Context to Stores

---

## 🎯 **CURRENT STATUS**
**Phase**: Not Started
**Next Task**: Create `services/signatureService.js`
**Target Component**: `Found.jsx` signature verification logic
