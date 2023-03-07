from azure.storage.blob.baseblobservice import BaseBlobService
import os

account_name = os.environ.get('ACCOUNT_NAME')
account_key = os.environ.get('ACCOUNT_KEY')

print(account_name)
print(account_key)

blob_service = BaseBlobService(account_name=account_name, account_key=account_key) 

print(blob_service)

containers = blob_service.list_containers()
for c in containers: 
    print(c.name)
    blobs = blob_service.list_blobs(c.name)
    for b in blobs:
        print(f'-> {b.name}')