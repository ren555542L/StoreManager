# API Testing Outputs

## 1. Add a new product
**Request:** POST http://localhost:3000/products
**Body:** ```json
{
  "productName": "Laptop Pro X",
  "productCode": "LPT-001",
  "category": "Electronics",
  "supplierName": "Tech Corp",
  "quantityInStock": 50,
  "reorderLevel": 10,
  "unitPrice": 1200,
  "manufactureDate": "2025-01-01",
  "productType": "Non-Perishable",
  "status": "Available"
}
```
**Response Status:** 201
**Response Body:** ```json
{
  "productName": "Laptop Pro X",
  "productCode": "LPT-001",
  "category": "Electronics",
  "supplierName": "Tech Corp",
  "quantityInStock": 50,
  "reorderLevel": 10,
  "unitPrice": 1200,
  "manufactureDate": "2025-01-01T00:00:00.000Z",
  "productType": "Non-Perishable",
  "status": "Available",
  "_id": "69b27b74eca0a73bc36ae6b2",
  "createdAt": "2026-03-12T08:38:12.429Z",
  "updatedAt": "2026-03-12T08:38:12.429Z",
  "__v": 0
}
```

## 2. Get all products
**Request:** GET http://localhost:3000/products
**Response Status:** 200
**Response Body:** ```json
[
  {
    "_id": "69b27b74eca0a73bc36ae6b2",
    "productName": "Laptop Pro X",
    "productCode": "LPT-001",
    "category": "Electronics",
    "supplierName": "Tech Corp",
    "quantityInStock": 50,
    "reorderLevel": 10,
    "unitPrice": 1200,
    "manufactureDate": "2025-01-01T00:00:00.000Z",
    "productType": "Non-Perishable",
    "status": "Available",
    "createdAt": "2026-03-12T08:38:12.429Z",
    "updatedAt": "2026-03-12T08:38:12.429Z",
    "__v": 0
  }
]
```

## 3. Get product by ID
**Request:** GET http://localhost:3000/products/69b27b74eca0a73bc36ae6b2
**Response Status:** 200
**Response Body:** ```json
{
  "_id": "69b27b74eca0a73bc36ae6b2",
  "productName": "Laptop Pro X",
  "productCode": "LPT-001",
  "category": "Electronics",
  "supplierName": "Tech Corp",
  "quantityInStock": 50,
  "reorderLevel": 10,
  "unitPrice": 1200,
  "manufactureDate": "2025-01-01T00:00:00.000Z",
  "productType": "Non-Perishable",
  "status": "Available",
  "createdAt": "2026-03-12T08:38:12.429Z",
  "updatedAt": "2026-03-12T08:38:12.429Z",
  "__v": 0
}
```

## 4. Update product details
**Request:** PUT http://localhost:3000/products/69b27b74eca0a73bc36ae6b2
**Body:** ```json
{
  "unitPrice": 1100,
  "quantityInStock": 45
}
```
**Response Status:** 500
**Response Body:** ```json
{
  "error": "Server Error",
  "details": "next is not a function"
}
```

## 5. Search product by name
**Request:** GET http://localhost:3000/products/search?name=Laptop
**Response Status:** 200
**Response Body:** ```json
[
  {
    "_id": "69b27b74eca0a73bc36ae6b2",
    "productName": "Laptop Pro X",
    "productCode": "LPT-001",
    "category": "Electronics",
    "supplierName": "Tech Corp",
    "quantityInStock": 50,
    "reorderLevel": 10,
    "unitPrice": 1200,
    "manufactureDate": "2025-01-01T00:00:00.000Z",
    "productType": "Non-Perishable",
    "status": "Available",
    "createdAt": "2026-03-12T08:38:12.429Z",
    "updatedAt": "2026-03-12T08:38:12.429Z",
    "__v": 0
  }
]
```

## 6. Filter by category
**Request:** GET http://localhost:3000/products/category?cat=Electronics
**Response Status:** 200
**Response Body:** ```json
[
  {
    "_id": "69b27b74eca0a73bc36ae6b2",
    "productName": "Laptop Pro X",
    "productCode": "LPT-001",
    "category": "Electronics",
    "supplierName": "Tech Corp",
    "quantityInStock": 50,
    "reorderLevel": 10,
    "unitPrice": 1200,
    "manufactureDate": "2025-01-01T00:00:00.000Z",
    "productType": "Non-Perishable",
    "status": "Available",
    "createdAt": "2026-03-12T08:38:12.429Z",
    "updatedAt": "2026-03-12T08:38:12.429Z",
    "__v": 0
  }
]
```

## 7. Delete a product
**Request:** DELETE http://localhost:3000/products/69b27b74eca0a73bc36ae6b2
**Response Status:** 200
**Response Body:** ```json
{
  "message": "Product deleted successfully"
}
```

## 8. Validation Error (400 Bad Request)
**Request:** POST http://localhost:3000/products
**Body:** ```json
{
  "productName": "Bad Product"
}
```
**Response Status:** 400
**Response Body:** ```json
{
  "error": "Bad Request",
  "details": "Product validation failed: supplierName: Supplier Name is required, productCode: Product Code is required"
}
```

