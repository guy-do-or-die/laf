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
  Status,
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

// Helper function to get or create Status entity
function getOrCreateStatus(itemAddress: Bytes): Status {
  let statusEntity = Status.load(itemAddress)
  if (!statusEntity) {
    statusEntity = new Status(itemAddress)
    statusEntity.item = itemAddress
    statusEntity.status = "registered"
  }
  return statusEntity
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
  
  // Update Status entity
  let statusEntity = getOrCreateStatus(event.params.item)
  statusEntity.status = "found"
  statusEntity.finder = event.params.finder // Track who found the item
  statusEntity.foundAt = event.block.timestamp
  statusEntity.foundTx = event.transaction.hash
  statusEntity.lastUpdated = event.block.timestamp
  statusEntity.foundEvent = entity.id
  statusEntity.save()
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
  
  // Update Status entity
  let statusEntity = getOrCreateStatus(event.params.item)
  statusEntity.status = "lost"
  statusEntity.geoLocation = event.params.geoLocation
  statusEntity.latitude = coords[0]
  statusEntity.longitude = coords[1]
  statusEntity.lostAt = event.block.timestamp
  statusEntity.lostTx = event.transaction.hash
  statusEntity.lastUpdated = event.block.timestamp
  statusEntity.lostEvent = entity.id
  statusEntity.save()
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
  
  // Create Status entity
  let statusEntity = getOrCreateStatus(event.params.item)
  statusEntity.owner = event.params.owner
  statusEntity.hash = event.params.hash
  statusEntity.status = "registered"
  statusEntity.registeredAt = event.block.timestamp
  statusEntity.registeredTx = event.transaction.hash
  statusEntity.lastUpdated = event.block.timestamp
  statusEntity.registeredEvent = entity.id
  statusEntity.save()
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
  
  // Update Status entity
  let statusEntity = getOrCreateStatus(event.params.item)
  statusEntity.status = "returned"
  statusEntity.returnedAt = event.block.timestamp
  statusEntity.returnedTx = event.transaction.hash
  statusEntity.lastUpdated = event.block.timestamp
  statusEntity.returnedEvent = entity.id
  statusEntity.save()
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
