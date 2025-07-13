import { Bytes, BigDecimal } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll as ApprovalForAllEvent,
  Down as DownEvent,
  ItemFound as ItemFoundEvent,
  ItemLost as ItemLostEvent,
  ItemRegistered as ItemRegisteredEvent,
  ItemReturned as ItemReturnedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
  Up as UpEvent
} from "../generated/LAF/LAF"
import {
  ApprovalForAll,
  Down,
  ItemFound,
  ItemLost,
  ItemRegistered,
  ItemReturned,
  ItemStatus,
  OwnershipTransferred,
  TransferBatch,
  TransferSingle,
  URI,
  Up
} from "../generated/schema"

// Helper function to parse coordinates from geoLocation string "lat, lng"
function parseCoordinates(geoLocation: string): Array<BigDecimal | null> {
  if (!geoLocation || geoLocation.length == 0) {
    return [null, null]
  }
  
  let coords = geoLocation.split(",")
  if (coords.length != 2) {
    return [null, null]
  }
  
  let latStr = coords[0].trim()
  let lngStr = coords[1].trim()
  
  // Convert to BigDecimal (returns null if invalid)
  let lat = BigDecimal.fromString(latStr)
  let lng = BigDecimal.fromString(lngStr)
  
  return [lat, lng]
}

// Helper function to get or create ItemStatus entity
function getOrCreateItemStatus(itemAddress: Bytes): ItemStatus {
  let itemStatus = ItemStatus.load(itemAddress)
  if (!itemStatus) {
    itemStatus = new ItemStatus(itemAddress)
    itemStatus.item = itemAddress
    itemStatus.status = "registered"
  }
  return itemStatus
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDown(event: DownEvent): void {
  let entity = new Down(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleItemFound(event: ItemFoundEvent): void {
  let entity = new ItemFound(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.item = event.params.item     // Item contract address
  entity.owner = event.params.owner   // Original owner of the item
  entity.finder = event.params.finder // Who found the item
  entity.hash = event.params.hash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  
  // Update ItemStatus entity
  let itemStatus = getOrCreateItemStatus(event.params.item)
  itemStatus.status = "found"
  itemStatus.finder = event.params.finder // Track who found the item
  itemStatus.foundAt = event.block.timestamp
  itemStatus.foundTx = event.transaction.hash
  itemStatus.lastUpdated = event.block.timestamp
  itemStatus.foundEvent = entity.id
  itemStatus.save()
}

export function handleItemLost(event: ItemLostEvent): void {
  let entity = new ItemLost(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.item = event.params.item
  entity.hash = event.params.hash
  entity.owner = event.params.owner
  entity.rewardAmount = event.params.rewardAmount
  entity.geoLocation = event.params.geoLocation
  
  // Parse coordinates from geoLocation
  let coords = parseCoordinates(event.params.geoLocation)
  entity.latitude = coords[0]
  entity.longitude = coords[1]

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  
  // Update ItemStatus entity
  let itemStatus = getOrCreateItemStatus(event.params.item)
  itemStatus.status = "lost"
  itemStatus.geoLocation = event.params.geoLocation
  itemStatus.latitude = coords[0]
  itemStatus.longitude = coords[1]
  itemStatus.lostAt = event.block.timestamp
  itemStatus.lostTx = event.transaction.hash
  itemStatus.lastUpdated = event.block.timestamp
  itemStatus.lostEvent = entity.id
  itemStatus.save()
}

export function handleItemRegistered(event: ItemRegisteredEvent): void {
  let entity = new ItemRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.item = event.params.item
  entity.hash = event.params.hash
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  
  // Create ItemStatus entity
  let itemStatus = getOrCreateItemStatus(event.params.item)
  itemStatus.owner = event.params.owner
  itemStatus.hash = event.params.hash
  itemStatus.status = "registered"
  itemStatus.registeredAt = event.block.timestamp
  itemStatus.registeredTx = event.transaction.hash
  itemStatus.lastUpdated = event.block.timestamp
  itemStatus.registeredEvent = entity.id
  itemStatus.save()
}

export function handleItemReturned(event: ItemReturnedEvent): void {
  let entity = new ItemReturned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.item = event.params.item
  entity.hash = event.params.hash
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  
  // Update ItemStatus entity
  let itemStatus = getOrCreateItemStatus(event.params.item)
  itemStatus.status = "returned"
  itemStatus.returnedAt = event.block.timestamp
  itemStatus.returnedTx = event.transaction.hash
  itemStatus.lastUpdated = event.block.timestamp
  itemStatus.returnedEvent = entity.id
  itemStatus.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.internal_id = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.internal_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUp(event: UpEvent): void {
  let entity = new Up(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
