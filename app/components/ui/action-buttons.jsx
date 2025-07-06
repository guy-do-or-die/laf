import { Link } from 'wouter';
import { AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "./button";
import TxButton from "../TxButton";
import { cn } from "@/app/lib/utils";

function ActionButton({ icon: Icon, children, variant = "outline", className, asChild, ...props }) {
  if (asChild) {
    // When using asChild, we need to pass the icon and text as a single child
    return (
      <Button 
        variant={variant} 
        className={cn("w-full retro-button", className)} 
        asChild
        {...props}
      >
        {children}
      </Button>
    );
  }
  
  return (
    <Button 
      variant={variant} 
      className={cn("w-full retro-button", className)} 
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );
}

export function ItemActionButtons({ 
  itemData, 
  hash, 
  currentUserAddress, 
  isLoading,
  simulateHook,
  writeHook,
  className 
}) {
  const { isLost, isFound, isReturned, owner, finder } = itemData;
  
  const isOwner = currentUserAddress && currentUserAddress.toLowerCase() === owner?.toLowerCase();
  const isFinder = currentUserAddress && currentUserAddress.toLowerCase() === finder?.toLowerCase();
  
  if (isLoading) {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="h-9 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }
  
  return (
    <div className={cn("space-y-2", className)}>
      {/* Report Lost Button */}
      {!isLost && (
        <ActionButton asChild>
          <Link to={`/lost/${hash}`}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Lost
          </Link>
        </ActionButton>
      )}
      
      {/* Found Item Actions */}
      {isFound && !isReturned && (
        <>
          {/* Connect Button */}
          <ActionButton asChild>
            {isOwner ? (
              <Link to={`/connect/${finder}`}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Connect with Finder
              </Link>
            ) : isFinder ? (
              <Link to={`/connect/${owner}`}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Connect with Owner
              </Link>
            ) : (
              <Link to={`/connect/${finder}`}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Connect
              </Link>
            )}
          </ActionButton>
          
          {/* Mark as Returned Button (Owner only) */}
          {isOwner && simulateHook && writeHook && (
            <TxButton
              simulateHook={simulateHook}
              writeHook={writeHook}
              params={{
                args: [hash],
                enabled: true
              }}
              text="Mark as Returned"
              className="w-full"
              variant="default"
            />
          )}
        </>
      )}
    </div>
  );
}

export { ActionButton };