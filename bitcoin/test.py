#!/usr/local/bin/python3
# From https://bitcoinlib.readthedocs.io/en/latest/index.html

from bitcoinlib.wallets import *

w = wallet_create_or_open("testnet1", network="testnet", witness_type="segwit")
k1 = w.get_key(1)

print(k1.address)

# n_utxos = w.utxos_update()
# if n_utxos:
#   print("Found new unspent outpus (UTXO's), we are ready to create a transaction")
# # w.info()
# balance = w.balance()
# print(balance)
# faucet_address = "tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt"
# # tx = w.send_to(faucet_address, 1000, fee=500)
# # tx.info()

# # tx = w.send_to(faucet_address, 10000, fee=500, network="testnet", offline=False)
# # tx.info()
# if w.utxos_update():
#   print("Found new unspent outputs(UTXO's), check out your balance")

# print(w.balance())



import argparse


def method1():
  print("This is method1")

def method2(arg1):
  print(f"This is method2 with {arg1}")

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument("method")
  parser.add_argument("-method_args", type=int)
  args = parser.parse_args()
  if args.method == "method1": method1()
  if args.method == "method2" and args.method_args:
    method2(args.method_args)
