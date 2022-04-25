#!/usr/local/bin/python3
import argparse
from bitcoinlib.wallets import *

def get_address(account="test1", type="segwit"):
  w = wallet_create_or_open(name=account, network="testnet", witness_type=type)
  k = w.get_key(1)
  print(k.address)
  return k.address

def get_balance(account):
  w = wallet_create_or_open("account", network="testnet")
  w.utxos_update()
  print(w.balance())
  return w.balance()

def verify_transfer(account, amount):
  w = wallet_create_or_open(name=account, network="testnet")
  pre_balance = w.balance()
  if w.utxos_update():
    balance = w.balance()
    if (balance - pre_balance) == amount:
      print("true")
  print("false")

# need to optimise, auto geting proper fees
# getting proper tx fee from https://bitcoinfees.earn.com/
# using their api: https://bitcoinfees.earn.com/api
# def get_fee():
#   pass
FEE = 50
def withdraw(from_account, to_addr, amount):
  w = wallet_create_or_open(name=from_account, network="testnet")
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
  parser = argparse.ArgumentParser()
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
