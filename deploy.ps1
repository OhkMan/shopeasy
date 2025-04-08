# Azure App Service deployment script
$resourceGroup = "shopeasy-rg"
$appName = "shopeasy-app"
$location = "centralindia"
$storageAccount = "shopeasystorage1"

# Configure Node.js version
az webapp config set --name $appName --resource-group $resourceGroup --linux-fx-version "NODE|18-lts"

# Set environment variables
az webapp config appsettings set --name $appName --resource-group $resourceGroup --settings @(
    "SQL_USER=shopeasyadmin",
    "SQL_PASSWORD=Rohit#123",
    "SQL_SERVER=shopeasy-server.database.windows.net",
    "SQL_DATABASE=shopeasy-db",
    "STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=shopeasystorage1;AccountKey=2YHc1qo1IP4n0uzbFQOwHOvw1UcgQ1LO/+hfK97FYnUyf6w7hYhBGI8eB0WwlxDu3oq036OVcFbf+AStZQ3lJA==;EndpointSuffix=core.windows.net",
    "STORAGE_CONTAINER_NAME=product-images",
    "JWT_SECRET=shopeasy-secure-jwt-key-2024",
    "PORT=3000",
    "APP_URL=https://shopeasy-app-cgajx6audwa0ee.centralindia-01.azurewebsites.net",
    "SCM_DO_BUILD_DURING_DEPLOYMENT=true",
    "WEBSITE_NODE_DEFAULT_VERSION=~18"
)

# Enable CORS
az webapp cors add --name $appName --resource-group $resourceGroup --allowed-origins "https://shopeasy-app-cgajx6audwa0ee.centralindia-01.azurewebsites.net"

# Configure startup command
az webapp config set --name $appName --resource-group $resourceGroup --startup-file "npm install && npm start"

# Deploy the application
az webapp deploy --resource-group $resourceGroup --name $appName --src-path ./app.zip --type zip 