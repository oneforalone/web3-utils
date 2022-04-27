#!/usr/local/bin/python3

from argparse import ArgumentParser
from bitcoinlib.wallets import wallet_create_or_open

from typing import Tuple

def get_address(
  account: str = "test1",
  type: str = "segwit"
) -> Tuple(str, str):
  w = wallet_create_or_open(
    name=account,
    network="testnet",
    witness_type=type,
  )
  k = w.get_key(1)
  print(k.address, k.wif)
  return (k.address, k.wif)

def get_balance(account: str) -> int:
  w = wallet_create_or_open(
    name=account,
    network="testnet",
    witness_type="segwit",
  )
  w.utxos_update()
  print(w.balance())
  return w.balance()

def verify_transfer(account: str, amount: int) -> bool:
  w = wallet_create_or_open(
    name=account,
    network="testnet",
    witness_type="segwit",
  )
  pre_balance = w.balance()
  if w.utxos_update():
    balance = w.balance()
    if (balance - pre_balance) == amount:
      print("true")
      return True
  print("false")
  return False

# need to optimise, auto geting proper fees
# getting proper tx fee from https://bitcoinfees.earn.com/
# using their api: https://bitcoinfees.earn.com/api
# def get_fee():
#   pass
FEE = 50
def withdraw(from_account: str, to_addr: str, amount: int) -> str:
  w = wallet_create_or_open(
    name=from_account,
    network="testnet",
    witness_type="segwit"
  )
  w.utxos_update()
  balance = w.balance()
  if balance < amount + FEE:
    return "Out of balance"
  tx = w.send_to(to_addr, amount, FEE, offline=False)
  print(tx.txhash)
  return tx.txhash


# checkout the total balance
def checkouts(accounts, balance):
  balance_sum = 0
  for account in accounts:
    balance_sum += get_balance(account)
  if (balance_sum != balance):
    return balance_sum - balance
  return 0


if __name__ == '__main__':
  parser = ArgumentParser()
  parser.add_argument("method")
  parser.add_argument("account")
  parser.add_argument("--amount", type=int)
  parser.add_argument("--recipent")

  args = parser.parse_args()
  method = args.method
  account = args.account
  if args.amount:
    amount = args.amount
  if args.recipent:
    recipent = args.recipent

  if method == "get_address"     : get_address(account)
  if method == "get_balance"     : get_balance(account)
  if method == "withdraw"        : withdraw(account, recipent, amount)
  if method == "verify_transfer" : verify_transfer(account, amount)
  if method == "checkouts"       : checkouts(account, amount)
