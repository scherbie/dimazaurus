require 'azure/storage/blob'

# Azure storage account details
account_name = ENV['ACCOUNT_NAME']
account_key = ENV['ACCOUNT_KEY']

puts account_key
puts account_name

# Create azure blob storage client
blob_client = Azure::Storage::Blob::BlobService.create(
    storage_account_name: account_name,
    storage_access_key: account_key
)

puts blob_client

# loop thorugh the containers
blob_client.list_containers().each do |c|
    puts c.name
    blob_client.list_blobs(c.name).each do |b|
        puts "-> #{b.name}"
    end
end

