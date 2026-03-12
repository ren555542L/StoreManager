const fs = require('fs');

async function runTests() {
  const baseUrl = 'http://localhost:3000/products';
  let output = '# API Testing Outputs\n\n';

  const log = (title, req, resStatus, resData) => {
    output += `## ${title}\n`;
    output += `**Request:** ${req.method} ${req.url}\n`;
    if (req.body) output += `**Body:** \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\`\n`;
    output += `**Response Status:** ${resStatus}\n`;
    output += `**Response Body:** \`\`\`json\n${JSON.stringify(resData, null, 2)}\n\`\`\`\n\n`;
  };

  try {
    // 1. POST /products
    const newProduct = {
      productName: 'Laptop Pro X',
      productCode: 'LPT-001',
      category: 'Electronics',
      supplierName: 'Tech Corp',
      quantityInStock: 50,
      reorderLevel: 10,
      unitPrice: 1200,
      manufactureDate: '2025-01-01',
      productType: 'Non-Perishable',
      status: 'Available'
    };

    const postRes = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    const postData = await postRes.json();
    log('1. Add a new product', { method: 'POST', url: baseUrl, body: newProduct }, postRes.status, postData);

    const productId = postData._id;

    // 2. GET /products
    const getAllRes = await fetch(baseUrl);
    const getAllData = await getAllRes.json();
    log('2. Get all products', { method: 'GET', url: baseUrl }, getAllRes.status, getAllData);

    // 3. GET /products/:id
    const getByIdRes = await fetch(`${baseUrl}/${productId}`);
    const getByIdData = await getByIdRes.json();
    log('3. Get product by ID', { method: 'GET', url: `${baseUrl}/${productId}` }, getByIdRes.status, getByIdData);

    // 4. PUT /products/:id
    const putRes = await fetch(`${baseUrl}/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unitPrice: 1100, quantityInStock: 45 })
    });
    const putData = await putRes.json();
    log('4. Update product details', { method: 'PUT', url: `${baseUrl}/${productId}`, body: { unitPrice: 1100, quantityInStock: 45 } }, putRes.status, putData);

    // 5. GET /products/search?name=xyz
    const searchRes = await fetch(`${baseUrl}/search?name=Laptop`);
    const searchData = await searchRes.json();
    log('5. Search product by name', { method: 'GET', url: `${baseUrl}/search?name=Laptop` }, searchRes.status, searchData);

    // 6. GET /products/category?cat=xyz
    const catRes = await fetch(`${baseUrl}/category?cat=Electronics`);
    const catData = await catRes.json();
    log('6. Filter by category', { method: 'GET', url: `${baseUrl}/category?cat=Electronics` }, catRes.status, catData);

    // 7. DELETE /products/:id
    const delRes = await fetch(`${baseUrl}/${productId}`, { method: 'DELETE' });
    const delData = await delRes.json();
    log('7. Delete a product', { method: 'DELETE', url: `${baseUrl}/${productId}` }, delRes.status, delData);

    // Additional: Error Handling 400 Bad Request
    const badProduct = { productName: 'Bad Product' }; // Missing required fields
    const badRes = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(badProduct)
    });
    const badData = await badRes.json();
    log('8. Validation Error (400 Bad Request)', { method: 'POST', url: baseUrl, body: badProduct }, badRes.status, badData);

    fs.writeFileSync('api_tests.md', output);
    console.log('Successfully wrote api_tests.md');
  } catch (err) {
    console.error('Error running tests:', err);
  }
}

runTests();
