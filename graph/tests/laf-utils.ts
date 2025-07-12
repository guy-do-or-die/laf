import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll,
  Down,
  ItemFound,
  ItemLost,
  ItemRegistered,
  ItemReturned,
  OwnershipTransferred,
  TransferBatch,
  TransferSingle,
  URI,
  Up
} from "../generated/LAF/LAF"

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createDownEvent(from: Address, to: Address): Down {
  let downEvent = changetype<Down>(newMockEvent())

  downEvent.parameters = new Array()

  downEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  downEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return downEvent
}

export function createItemFoundEvent(
  owner: Address,
  item: Address,
  hash: Address
): ItemFound {
  let itemFoundEvent = changetype<ItemFound>(newMockEvent())

  itemFoundEvent.parameters = new Array()

  itemFoundEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  itemFoundEvent.parameters.push(
    new ethereum.EventParam("item", ethereum.Value.fromAddress(item))
  )
  itemFoundEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromAddress(hash))
  )

  return itemFoundEvent
}

export function createItemLostEvent(
  owner: Address,
  item: Address,
  hash: Address
): ItemLost {
  let itemLostEvent = changetype<ItemLost>(newMockEvent())

  itemLostEvent.parameters = new Array()

  itemLostEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  itemLostEvent.parameters.push(
    new ethereum.EventParam("item", ethereum.Value.fromAddress(item))
  )
  itemLostEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromAddress(hash))
  )

  return itemLostEvent
}

export function createItemRegisteredEvent(
  owner: Address,
  item: Address,
  hash: Address
): ItemRegistered {
  let itemRegisteredEvent = changetype<ItemRegistered>(newMockEvent())

  itemRegisteredEvent.parameters = new Array()

  itemRegisteredEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  itemRegisteredEvent.parameters.push(
    new ethereum.EventParam("item", ethereum.Value.fromAddress(item))
  )
  itemRegisteredEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromAddress(hash))
  )

  return itemRegisteredEvent
}

export function createItemReturnedEvent(
  owner: Address,
  item: Address,
  hash: Address
): ItemReturned {
  let itemReturnedEvent = changetype<ItemReturned>(newMockEvent())

  itemReturnedEvent.parameters = new Array()

  itemReturnedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  itemReturnedEvent.parameters.push(
    new ethereum.EventParam("item", ethereum.Value.fromAddress(item))
  )
  itemReturnedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromAddress(hash))
  )

  return itemReturnedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}

export function createUpEvent(from: Address, to: Address): Up {
  let upEvent = changetype<Up>(newMockEvent())

  upEvent.parameters = new Array()

  upEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  upEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return upEvent
}
