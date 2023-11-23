import { Request, Response, Router } from "express";
import axios from "axios";

export const setCatalogRoutes = (routes: Router) => {
    // Rota para obter todas as marcas
    routes.get('/stores/:store_hash/v3/catalog/brands', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const { id, id_in, id_not_in, id_min, id_max, id_greater, id_less, name, name_like, page_title, page, limit, include_fields, exclude_fields, sort } = request.query;

            const brandsResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
                params: {
                    id,
                    id_in,
                    id_not_in,
                    id_min,
                    id_max,
                    id_greater,
                    id_less,
                    name,
                    name_like,
                    page_title,
                    page,
                    limit,
                    include_fields,
                    exclude_fields,
                    sort,
                },
            });

            response.json(brandsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get brands");
        }
    });
    routes.post('/stores/:store_hash/v3/catalog/brands', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const createBrandData = request.body;

            const createBrandResponse = await axios.post(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands`, createBrandData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(createBrandResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create brand");
        }
    });
    routes.delete('/stores/:store_hash/v3/catalog/brands', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const { nome } = request.query;

            if (!nome) {
                return response.status(400).json({ error: 'O campo "nome" é obrigatório para excluir uma marca.' });
            }

            const deleteBrandResponse = await axios.delete(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
                params: {
                    nome: nome as string,
                },
            });

            response.json(deleteBrandResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete brand");
        }
    });
    routes.get('/stores/:store_hash/v3/catalog/brands/:brand_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const brandId = request.params.brand_id;
            const { include_fields, exclude_fields } = request.query;

            const getSingleBrandResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands/${brandId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
                params: {
                    include_fields: include_fields as string,
                    exclude_fields: exclude_fields as string,
                },
            });

            response.json(getSingleBrandResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get single brand");
        }
    });
    routes.put('/stores/:store_hash/v3/catalog/brands/:brand_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const brandId = request.params.brand_id;
            const updateBrandData = request.body;

            const updateBrandResponse = await axios.put(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands/${brandId}`, updateBrandData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(updateBrandResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update brand");
        }
    });
    routes.delete('/stores/:store_hash/v3/catalog/brands/:brand_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const brandId = request.params.brand_id;

            const deleteBrandResponse = await axios.delete(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands/${brandId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(deleteBrandResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete brand");
        }
    });
    routes.post('/stores/:store_hash/v3/catalog/brands/:brand_id/image', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const brandId = request.params.brand_id;

            // Assumindo que image_file é enviado como parte de uma postagem de formulário
            const formData = new FormData();
            formData.append('image_file', request.file.buffer, {
                filename: request.file.originalname,
                contentType: request.file.mimetype,
            });

            const createImageResponse = await axios.post(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands/${brandId}/image`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(createImageResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create brand image");
        }
    });
    routes.delete('/stores/:store_hash/v3/catalog/brands/:brand_id/image', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const brandId = request.params.brand_id;

            const deleteImageResponse = await axios.delete(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands/${brandId}/image`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(deleteImageResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete brand image");
        }
    });
    routes.get('/stores/:store_hash/v3/catalog/brands/:brand_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const brandId = request.params.brand_id;
            const metafieldId = request.params.metafield_id;

            const getMetafieldResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands/${brandId}/metafields/${metafieldId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
                params: request.query,
            });

            response.json(getMetafieldResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get brand metafield");
        }
    });
    routes.put('/stores/:store_hash/v3/catalog/brands/:brand_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const brandId = request.params.brand_id;
            const metafieldId = request.params.metafield_id;
            const metafieldData = request.body;

            const updateMetafieldResponse = await axios.put(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands/${brandId}/metafields/${metafieldId}`, metafieldData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(updateMetafieldResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update brand metafield");
        }
    });
    routes.delete('/stores/:store_hash/v3/catalog/brands/:brand_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const brandId = request.params.brand_id;
            const metafieldId = request.params.metafield_id;

            const deleteMetafieldResponse = await axios.delete(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands/${brandId}/metafields/${metafieldId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(deleteMetafieldResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete brand metafield");
        }
    });
    routes.get('/stores/:store_hash/v3/catalog/categories', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const getAllCategoriesResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(getAllCategoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get all categories");
        }
    });

    // Rota para criar uma nova categoria
    routes.post('/stores/:store_hash/v3/catalog/categories', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const requestBody = request.body;

            const createCategoryResponse = await axios.post(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories`, requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(createCategoryResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create category");
        }
    });
    routes.delete('/stores/:store_hash/v3/catalog/categories', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            // Defina os parâmetros de filtro necessários
            const params = {
                id: 1 // Substitua 1 pelo ID da categoria que deseja excluir
            };

            const deleteCategoriesResponse = await axios.delete(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
                params: params
            });

            response.json(deleteCategoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete categories");
        }
    });

    // Rota para obter e atualizar uma categoria específica
    routes.get('/stores/:store_hash/v3/catalog/categories/:category_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;

            // Obter uma categoria
            const getCategoryResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(getCategoryResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get category");
        }
    });

    // Rota para atualizar uma categoria
    routes.put('/stores/:store_hash/v3/catalog/categories/:category_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;
            const requestBody = request.body;

            // Atualizar uma categoria
            const updateCategoryResponse = await axios.put(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}`, requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(updateCategoryResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update category");
        }
    });
    routes.post('/stores/:store_hash/v3/catalog/categories/:category_id/image', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;

            // Certifique-se de configurar o middleware adequado para processar o formulário de postagem

            // Exemplo de middleware para processar o formulário de postagem:
            // const upload = multer({ dest: 'uploads/' });
            // routes.use('/uploads', express.static('uploads'));
            // routes.post('/stores/:store_hash/v3/catalog/categories/:category_id/image', upload.single('image_file'), async (request: Request, response: Response) => {

            // Obter o caminho do arquivo enviado
            const imagePath = `uploads/${request.file.filename}`;

            const createImageResponse = await axios.post(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}/image`, {
                image_file: imagePath
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(createImageResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create category image");
        }
    });

    // Rota para excluir uma imagem de categoria
    routes.delete('/stores/:store_hash/v3/catalog/categories/:category_id/image', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;

            const deleteImageResponse = await axios.delete(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}/image`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(deleteImageResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete category image");
        }
    });
    routes.get('/stores/:store_hash/v3/catalog/categories/:category_id/metafields', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;

            const getMetafieldsResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}/metafields`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(getMetafieldsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get category metafields");
        }
    });

    // Rota para criar um metacampo de categoria
    routes.post('/stores/:store_hash/v3/catalog/categories/:category_id/metafields', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;

            const createMetafieldResponse = await axios.post(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}/metafields`, {
                key: "Location",
                value: "4HG",
                namespace: "Warehouse Locations",
                permission_set: "app_only",
                description: "Location in the warehouse"
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(createMetafieldResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create category metafield");
        }
    });

    // Rota para obter um único metacampo de categoria
    routes.get('/stores/:store_hash/v3/catalog/categories/:category_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;
            const metafieldId = request.params.metafield_id;

            const getMetafieldResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}/metafields/${metafieldId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(getMetafieldResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get category metafield");
        }
    });
    routes.put('/stores/:store_hash/v3/catalog/categories/:category_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;
            const metafieldId = request.params.metafield_id;

            const updateMetafieldResponse = await axios.put(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}/metafields/${metafieldId}`, {
                key: "Location",
                value: "NewValue", // Atualize o valor conforme necessário
                namespace: "Warehouse Locations",
                permission_set: "app_only",
                description: "Updated location in the warehouse"
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(updateMetafieldResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update category metafield");
        }
    });

    // Rota para excluir um metacampo de categoria
    routes.delete('/stores/:store_hash/v3/catalog/categories/:category_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;
            const metafieldId = request.params.metafield_id;

            const deleteMetafieldResponse = await axios.delete(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}/metafields/${metafieldId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(deleteMetafieldResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete category metafield");
        }
    });

    // Rota para obter a ordem de classificação de produtos para uma categoria específica
    routes.get('/stores/:store_hash/v3/catalog/categories/:category_id/products/sort-order', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;

            const getSortOrderResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}/products/sort-order`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(getSortOrderResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get product sort order");
        }
    });
    routes.put('/stores/:store_hash/v3/catalog/categories/:category_id/products/sort-order', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const categoryId = request.params.category_id;

            const updateSortOrderResponse = await axios.put(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoryId}/products/sort-order`, [
                {
                    "product_id": 99, // Substitua pelo ID do produto
                    "sort_order": 4 // Substitua pela nova ordem de classificação
                }
            ], {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(updateSortOrderResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update product sort order");
        }
    });

    // Rota para obter todas as árvores de categoria
    routes.get('/stores/:store_hash/v3/catalog/trees', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const getTreesResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/trees`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(getTreesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get category trees");
        }
    });

    // Rota para upsert (atualizar ou criar) árvores de categoria
    routes.post('/stores/:store_hash/v3/catalog/trees', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const upsertTreesResponse = await axios.post(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/trees`, [
                {
                    "id": 0, // Substitua pelo ID da árvore, se existir
                    "name": "Sample Tree", // Substitua pelo nome da árvore
                    "channels": [0] // Substitua pelos IDs dos canais associados à árvore
                }
            ], {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(upsertTreesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to upsert category trees");
        }
    });
    routes.delete('/stores/:store_hash/v3/catalog/trees', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const deleteTreesResponse = await axios.delete(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/trees`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(deleteTreesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete category trees");
        }
    });

    // Rota para obter uma lista de categorias
    routes.get('/stores/:store_hash/v3/catalog/trees/categories', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const getCategoriesResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/trees/categories`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(getCategoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get categories");
        }
    });

    // Rota para criar novas categorias
    routes.post('/stores/:store_hash/v3/catalog/trees/categories', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const createCategoriesResponse = await axios.post(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/trees/categories`, [
                {
                    "tree_id": 0, // Substitua pelo ID da árvore
                    "parent_id": 0, // Substitua pelo ID do pai
                    "name": "Sample Category", // Substitua pelo nome da categoria
                    "description": "Sample description",
                    "views": 0,
                    "sort_order": 0,
                    "page_title": "Sample Page Title",
                    "search_keywords": "Sample Keywords",
                    "meta_keywords": [
                        "Keyword1",
                        "Keyword2"
                    ],
                    "meta_description": "Sample Meta Description",
                    "layout_file": "Sample Layout File",
                    "is_visible": true,
                    "image_url": "Sample Image URL",
                    "url": {
                        "path": "sample-path",
                        "is_customized": true
                    },
                    "default_product_sort": "use_store_settings"
                }
            ], {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(createCategoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create categories");
        }
    });
    routes.put('/stores/:store_hash/v3/catalog/trees/categories', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const updateCategoriesResponse = await axios.put(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/trees/categories`, [
                {
                    "tree_id": 0,
                    "category_id": 0,
                    "category_uuid": "d5e0e6e9-d809-4adf-9920-3a698629ce74",
                    "parent_id": 0,
                    "name": "Updated Category",
                    // ... (Other fields to update)
                }
            ], {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY'
                }
            });

            response.json(updateCategoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update categories");
        }
    });
    routes.delete('/stores/:store_hash/v3/catalog/trees/categories', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const deleteCategoriesResponse = await axios.delete(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/trees/categories`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY'
                },
                data: {
                    "category_uuid": "d5e0e6e9-d809-4adf-9920-3a698629ce74"
                    // ... (Other query parameters)
                }
            });

            response.json(deleteCategoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete categories");
        }
    });
    routes.get('/stores/:store_hash/v3/catalog/trees/:tree_id/categories', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;
            const treeId = request.params.tree_id;

            const getTreeCategoriesResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/trees/${treeId}/categories`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY'
                }
            });

            response.json(getTreeCategoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get tree categories");
        }
    });
    routes.get('/stores/:store_hash/v3/catalog/products', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const queryParams = request.query;

            const getProductsResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY'
                },
                params: queryParams
            });

            response.json(getProductsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch products");
        }
    });
    routes.put('/stores/:store_hash/v3/catalog/products', async (request: Request, response: Response) => {
        try {
            const storeHash = request.params.store_hash;

            const requestBody = request.body;

            const updateProductsBatchResponse = await axios.put(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products`, requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'YOUR_API_KEY'
                },
            });

            response.json(updateProductsBatchResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update products batch");
        }
    });
    routes.post('/stores/:store_hash/v3/catalog/products', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const productData = {
            name: "Diário Smith 13",
            type: "physical",
            sku: "SM-13",
            description: "<p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</span></p>",
            weight: 1.5,
            width: 10.0,
            depth: 5.0,
            height: 8.0,
            price: 29.99,
            // Adicione outros campos conforme necessário
          };
    
          const createProductResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products`,
            productData,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createProductResponse.status === 201) {
            console.log("Produto criado com sucesso!");
            const productId = createProductResponse.data.data.id;
            console.log(`ID do produto: ${productId}`);
            response.status(201).json(createProductResponse.data);
          } else {
            console.error(`Falha ao criar o produto. Código de status: ${createProductResponse.status}`);
            response.status(createProductResponse.status).send("Failed to create product");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const productIdsToDelete = [1, 2, 3]; // Substitua pelos IDs reais dos produtos que você deseja excluir
    
          const deleteProductsResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?id:in=${productIdsToDelete.join(',')}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteProductsResponse.status === 204) {
            console.log("Produtos excluídos com sucesso!");
            response.status(204).send();
          } else {
            console.error(`Falha ao excluir produtos. Código de status: ${deleteProductsResponse.status}`);
            response.status(deleteProductsResponse.status).send("Failed to delete products");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete products");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const includeFields = "variants,images,custom_fields,bulk_pricing_rules,primary_image,modifiers,options,videos";
    
          const getProductResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}?include=${includeFields}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getProductResponse.status === 200) {
            console.log("Produto obtido com sucesso!");
            response.json(getProductResponse.data);
          } else {
            console.error(`Falha ao obter o produto. Código de status: ${getProductResponse.status}`);
            response.status(getProductResponse.status).send("Failed to get product");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const requestBody = {
            name: "Diário Smith 13",
            type: "physical",
            sku: "SM-13",
            description: "<p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel metus ac est egestas porta sed quis erat. Integer id nulla massa. Proin vitae enim nisi. Praesent non dignissim nulla. Nulla mattis id massa ac pharetra. Mauris et nisi in dolor aliquam sodales. Aliquam dui nisl, dictum quis leo sit amet, rutrum volutpat metus. Curabitur libero nunc, interdum ac libero non, tristique porttitor metus. Ut non dignissim lorem, in vestibulum leo. Vivamus sodales quis turpis eget.</span></p>",
            weight: 10, // Peso em gramas
            price: 50.99,
            categories: [1, 2], // Substitua pelos IDs reais das categorias
            brand_id: 1, // Substitua pelo ID real da marca
            inventory_level: 100,
            inventory_warning_level: 10,
            inventory_tracking: "product",
            is_free_shipping: true,
            is_visible: true,
            is_featured: false,
            related_products: [4, 5], // Substitua pelos IDs reais dos produtos relacionados
            warranty: "1 year",
            bin_picking_number: "BIN123",
            layout_file: "product_layout",
            upc: "123456789012",
            search_keywords: "journal, notebook, writing",
            availability_description: "Usually ships in 24 hours",
            availability: "available",
            gift_wrapping_options_type: "any",
            gift_wrapping_options_list: [1, 2], // Substitua pelos IDs reais das opções de embrulho de presente
            sort_order: 10,
            condition: "New",
            is_condition_shown: true,
            order_quantity_minimum: 1,
            order_quantity_maximum: 10,
            page_title: "Diário Smith 13",
            meta_keywords: ["journal", "notebook", "writing"],
            meta_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            custom_url: {
              url: "diario-smith-13",
              is_customized: true,
            },
            open_graph_type: "product",
            open_graph_title: "Diário Smith 13",
            open_graph_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            open_graph_use_meta_description: true,
            open_graph_use_product_name: true,
            open_graph_use_image: true,
            gtin: "123456789012",
            mpn: "MPN123",
            reviews_rating_sum: 4,
            reviews_count: 10,
            total_sold: 50,
            custom_fields: [
              {
                id: 1,
                name: "Custom Field 1",
                value: "Value 1",
              },
              {
                id: 2,
                name: "Custom Field 2",
                value: "Value 2",
              },
            ],
            bulk_pricing_rules: [
              {
                quantity_min: 5,
                quantity_max: 10,
                type: "price",
                amount: 45.99,
              },
            ],
            images: [
              {
                image_file: "image1.jpg",
                is_thumbnail: true,
                sort_order: 1,
                description: "Product Image 1",
                image_url: "https://example.com/image1.jpg",
              },
              {
                image_file: "image2.jpg",
                is_thumbnail: false,
                sort_order: 2,
                description: "Product Image 2",
                image_url: "https://example.com/image2.jpg",
              },
            ],
            videos: [
              {
                title: "Product Video",
                description: "A video about the product",
                sort_order: 1,
                type: "youtube",
                video_id: "xyz123",
              },
            ],
            variants: [
              {
                cost_price: 40.99,
                price: 49.99,
                sale_price: 45.99,
                retail_price: 55.99,
                weight: 5,
                width: 10,
                height: 15,
                depth: 5,
                is_free_shipping: false,
                fixed_cost_shipping_price: 5.99,
                purchasing_disabled: false,
                purchasing_disabled_message: "This variant is available for purchase",
                upc: "variant-upc-123",
                inventory_level: 50,
                inventory_warning_level: 5,
                bin_picking_number: "BIN456",
                mpn: "variant-mpn-123",
                gtin: "012345678906",
                option_values: [
                  {
                    option_display_name: "Color",
                    label: "Red",
                  },
                ],
              },
            ],
          };
    
          const updateProductResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}`,
            requestBody,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateProductResponse.status === 200) {
            console.log("Produto atualizado com sucesso!");
            response.json(updateProductResponse.data);
          } else {
            console.error(`Falha ao atualizar o produto. Código de status: ${updateProductResponse.status}`);
            response.status(updateProductResponse.status).send("Failed to update product");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update product");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteProductResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteProductResponse.status === 204) {
            console.log("Produto excluído com sucesso!");
            response.sendStatus(204);
          } else {
            console.error(`Falha ao excluir o produto. Código de status: ${deleteProductResponse.status}`);
            response.status(deleteProductResponse.status).send("Failed to delete product");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete product");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/bulk-pricing-rules', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getAllBulkPricingRulesResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/bulk-pricing-rules`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getAllBulkPricingRulesResponse.status === 200) {
            console.log("Regras de preços em massa obtidas com sucesso!");
            response.json(getAllBulkPricingRulesResponse.data);
          } else {
            console.error(`Falha ao obter as regras de preços em massa. Código de status: ${getAllBulkPricingRulesResponse.status}`);
            response.status(getAllBulkPricingRulesResponse.status).send("Failed to get bulk pricing rules");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get bulk pricing rules");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/bulk-pricing-rules', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const createBulkPricingRulePayload = {
            quantity_min: 10,
            quantity_max: 50,
            type: "price",
            amount: 10
          };
    
          const createBulkPricingRuleResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/bulk-pricing-rules`,
            createBulkPricingRulePayload,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createBulkPricingRuleResponse.status === 201) {
            console.log("Regra de preços em massa criada com sucesso!");
            response.json(createBulkPricingRuleResponse.data);
          } else {
            console.error(`Falha ao criar a regra de preços em massa. Código de status: ${createBulkPricingRuleResponse.status}`);
            response.status(createBulkPricingRuleResponse.status).send("Failed to create bulk pricing rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create bulk pricing rule");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/bulk-pricing-rules/:bulk_pricing_rule_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const bulkPricingRuleId = request.params.bulk_pricing_rule_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getBulkPricingRuleResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/bulk-pricing-rules/${bulkPricingRuleId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getBulkPricingRuleResponse.status === 200) {
            console.log("Regra de preços em massa obtida com sucesso!");
            response.json(getBulkPricingRuleResponse.data);
          } else {
            console.error(`Falha ao obter a regra de preços em massa. Código de status: ${getBulkPricingRuleResponse.status}`);
            response.status(getBulkPricingRuleResponse.status).send("Failed to get bulk pricing rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get bulk pricing rule");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/bulk-pricing-rules/:bulk_pricing_rule_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const bulkPricingRuleId = request.params.bulk_pricing_rule_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const updateBulkPricingRulePayload = {
            quantity_min: 10,
            quantity_max: 50,
            type: "price",
            amount: 10
          };
    
          const updateBulkPricingRuleResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/bulk-pricing-rules/${bulkPricingRuleId}`,
            updateBulkPricingRulePayload,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateBulkPricingRuleResponse.status === 200) {
            console.log("Regra de preços em massa atualizada com sucesso!");
            response.json(updateBulkPricingRuleResponse.data);
          } else {
            console.error(`Falha ao atualizar a regra de preços em massa. Código de status: ${updateBulkPricingRuleResponse.status}`);
            response.status(updateBulkPricingRuleResponse.status).send("Failed to update bulk pricing rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update bulk pricing rule");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/bulk-pricing-rules/:bulk_pricing_rule_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const bulkPricingRuleId = request.params.bulk_pricing_rule_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteBulkPricingRuleResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/bulk-pricing-rules/${bulkPricingRuleId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteBulkPricingRuleResponse.status === 204) {
            console.log("Regra de preços em massa excluída com sucesso!");
            response.status(204).send();
          } else {
            console.error(`Falha ao excluir a regra de preços em massa. Código de status: ${deleteBulkPricingRuleResponse.status}`);
            response.status(deleteBulkPricingRuleResponse.status).send("Failed to delete bulk pricing rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete bulk pricing rule");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/category-assignments', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getCategoryAssignmentsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/category-assignments`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getCategoryAssignmentsResponse.status === 200) {
            console.log("Atribuições de categorias de produtos obtidas com sucesso!");
            response.json(getCategoryAssignmentsResponse.data);
          } else {
            console.error(`Falha ao obter atribuições de categorias de produtos. Código de status: ${getCategoryAssignmentsResponse.status}`);
            response.status(getCategoryAssignmentsResponse.status).send("Failed to get category assignments");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get category assignments");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/category-assignments', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getCategoryAssignmentsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/category-assignments`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getCategoryAssignmentsResponse.status === 200) {
            console.log("Atribuições de categoria de produtos obtidas com sucesso!");
            response.json(getCategoryAssignmentsResponse.data);
          } else {
            console.error(`Falha ao obter atribuições de categoria de produtos. Código de status: ${getCategoryAssignmentsResponse.status}`);
            response.status(getCategoryAssignmentsResponse.status).send("Failed to get category assignments");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get category assignments");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/category-assignments', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Forneça filtros conforme necessário
          const deleteCategoryAssignmentsPayload = {
            product_id: 'product_id_value',
            category_id: 'category_id_value',
          };
    
          const deleteCategoryAssignmentsResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/category-assignments`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
              data: deleteCategoryAssignmentsPayload,
            }
          );
    
          if (deleteCategoryAssignmentsResponse.status === 204) {
            console.log("Atribuições de categoria de produtos excluídas com sucesso!");
            response.status(204).send();
          } else {
            console.error(`Falha ao excluir atribuições de categoria de produtos. Código de status: ${deleteCategoryAssignmentsResponse.status}`);
            response.status(deleteCategoryAssignmentsResponse.status).send("Failed to delete category assignments");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete category assignments");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/channel-assignments', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getChannelAssignmentsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/channel-assignments`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getChannelAssignmentsResponse.status === 200) {
            console.log("Atribuições de canais de produtos obtidas com sucesso!");
            response.json(getChannelAssignmentsResponse.data);
          } else {
            console.error(`Falha ao obter atribuições de canais de produtos. Código de status: ${getChannelAssignmentsResponse.status}`);
            response.status(getChannelAssignmentsResponse.status).send("Failed to get channel assignments");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get channel assignments");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/channel-assignments', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Forneça o corpo da solicitação conforme necessário
          const createChannelAssignmentsPayload = [
            {
              "product_id": 0,
              "channel_id": 0
            }
          ];
    
          const createChannelAssignmentsResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/channel-assignments`,
            createChannelAssignmentsPayload,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createChannelAssignmentsResponse.status === 201) {
            console.log("Atribuições de canais de produtos criadas com sucesso!");
            response.status(201).send();
          } else {
            console.error(`Falha ao criar atribuições de canais de produtos. Código de status: ${createChannelAssignmentsResponse.status}`);
            response.status(createChannelAssignmentsResponse.status).send("Failed to create channel assignments");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create channel assignments");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/channel-assignments', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Forneça filtros conforme necessário
          const deleteChannelAssignmentsPayload = {
            product_id: 'product_id_value',
            channel_id: 'channel_id_value',
          };
    
          const deleteChannelAssignmentsResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/channel-assignments`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
              data: deleteChannelAssignmentsPayload,
            }
          );
    
          if (deleteChannelAssignmentsResponse.status === 204) {
            console.log("Atribuições de canais de produtos excluídas com sucesso!");
            response.status(204).send();
          } else {
            console.error(`Falha ao excluir atribuições de canais de produtos. Código de status: ${deleteChannelAssignmentsResponse.status}`);
            response.status(deleteChannelAssignmentsResponse.status).send("Failed to delete channel assignments");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete channel assignments");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/complex-rules', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Forneça o corpo da solicitação conforme necessário
          const createComplexRulesPayload = {
            product_id: 67,
            sort_order: 0,
            enabled: true,
            stop: true,
            purchasing_disabled: true,
            purchasing_disabled_message: "This product is not available at this time.",
            purchasing_hidden: true,
            image_url: "https://cdn8.bigcommerce.com/s-123456/product_images/d/fakeimage.png",
            price_adjuster: {
              adjuster: "relative",
              adjuster_value: 5,
            },
            weight_adjuster: {
              adjuster: "relative",
              adjuster_value: 5,
            },
            conditions: [
              {
                modifier_id: 55,
                modifier_value_id: 256,
                variant_id: 1,
              },
            ],
          };
    
          const createComplexRulesResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/complex-rules`,
            createComplexRulesPayload,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createComplexRulesResponse.status === 201) {
            console.log("Regra complexa de produtos criada com sucesso!");
            response.status(201).send();
          } else {
            console.error(`Falha ao criar regra complexa de produtos. Código de status: ${createComplexRulesResponse.status}`);
            response.status(createComplexRulesResponse.status).send("Failed to create complex rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create complex rule");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/complex-rules', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getComplexRulesResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/complex-rules`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getComplexRulesResponse.status === 200) {
            console.log("Regras complexas de produtos obtidas com sucesso!");
            response.json(getComplexRulesResponse.data);
          } else {
            console.error(`Falha ao obter regras complexas de produtos. Código de status: ${getComplexRulesResponse.status}`);
            response.status(getComplexRulesResponse.status).send("Failed to get complex rules");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get complex rules");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/complex-rules/:complex_rule_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const complexRuleId = request.params.complex_rule_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getComplexRuleResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/complex-rules/${complexRuleId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getComplexRuleResponse.status === 200) {
            console.log("Regra complexa de produto obtida com sucesso!");
            response.json(getComplexRuleResponse.data);
          } else {
            console.error(`Falha ao obter regra complexa de produto. Código de status: ${getComplexRuleResponse.status}`);
            response.status(getComplexRuleResponse.status).send("Failed to get complex rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get complex rule");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/complex-rules/:complex_rule_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const complexRuleId = request.params.complex_rule_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Forneça o corpo da solicitação conforme necessário
          const updateComplexRulePayload = {
            product_id: 67,
            sort_order: 0,
            enabled: true,
            // Outras propriedades aqui...
          };
    
          const updateComplexRuleResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/complex-rules/${complexRuleId}`,
            updateComplexRulePayload,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateComplexRuleResponse.status === 200) {
            console.log("Regra complexa de produto atualizada com sucesso!");
            response.status(200).send();
          } else {
            console.error(`Falha ao atualizar regra complexa de produto. Código de status: ${updateComplexRuleResponse.status}`);
            response.status(updateComplexRuleResponse.status).send("Failed to update complex rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update complex rule");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/complex-rules/:complex_rule_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const complexRuleId = request.params.complex_rule_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getComplexRuleResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/complex-rules/${complexRuleId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getComplexRuleResponse.status === 200) {
            console.log("Regra complexa de produto obtida com sucesso!");
            response.json(getComplexRuleResponse.data);
          } else {
            console.error(`Falha ao obter regra complexa de produto. Código de status: ${getComplexRuleResponse.status}`);
            response.status(getComplexRuleResponse.status).send("Failed to get complex rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get complex rule");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/complex-rules/:complex_rule_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const complexRuleId = request.params.complex_rule_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Forneça o corpo da solicitação conforme necessário
          const updateComplexRulePayload = {
            product_id: 67,
            sort_order: 0,
            enabled: true,
            // Outras propriedades aqui...
          };
    
          const updateComplexRuleResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/complex-rules/${complexRuleId}`,
            updateComplexRulePayload,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateComplexRuleResponse.status === 200) {
            console.log("Regra complexa de produto atualizada com sucesso!");
            response.status(200).send();
          } else {
            console.error(`Falha ao atualizar regra complexa de produto. Código de status: ${updateComplexRuleResponse.status}`);
            response.status(updateComplexRuleResponse.status).send("Failed to update complex rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update complex rule");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/complex-rules/:complex_rule_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const complexRuleId = request.params.complex_rule_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteComplexRuleResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/complex-rules/${complexRuleId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteComplexRuleResponse.status === 204) {
            console.log("Regra complexa de produto excluída com sucesso!");
            response.status(204).send();
          } else {
            console.error(`Falha ao excluir regra complexa de produto. Código de status: ${deleteComplexRuleResponse.status}`);
            response.status(deleteComplexRuleResponse.status).send("Failed to delete complex rule");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete complex rule");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/custom-fields', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getCustomFieldsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/custom-fields`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getCustomFieldsResponse.status === 200) {
            console.log("Campos personalizados obtidos com sucesso!");
            response.json(getCustomFieldsResponse.data);
          } else {
            console.error(`Falha ao obter campos personalizados. Código de status: ${getCustomFieldsResponse.status}`);
            response.status(getCustomFieldsResponse.status).send("Failed to get custom fields");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get custom fields");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/custom-fields', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Forneça o corpo da solicitação conforme necessário
          const createCustomFieldPayload = {
            name: "ISBN",
            value: "1234567890123",
          };
    
          const createCustomFieldResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/custom-fields`,
            createCustomFieldPayload,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createCustomFieldResponse.status === 201) {
            console.log("Campo personalizado criado com sucesso!");
            response.status(201).json(createCustomFieldResponse.data);
          } else {
            console.error(`Falha ao criar campo personalizado. Código de status: ${createCustomFieldResponse.status}`);
            response.status(createCustomFieldResponse.status).send("Failed to create custom field");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create custom field");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/custom-fields/:custom_field_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const customFieldId = request.params.custom_field_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getCustomFieldResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/custom-fields/${customFieldId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getCustomFieldResponse.status === 200) {
            console.log("Campo personalizado obtido com sucesso!");
            response.json(getCustomFieldResponse.data);
          } else {
            console.error(`Falha ao obter campo personalizado. Código de status: ${getCustomFieldResponse.status}`);
            response.status(getCustomFieldResponse.status).send("Failed to get custom field");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get custom field");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/custom-fields/:custom_field_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const customFieldId = request.params.custom_field_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Forneça o corpo da solicitação conforme necessário
          const updateCustomFieldPayload = {
            id: customFieldId,
            name: "ISBN",
            value: "1234567890123",
          };
    
          const updateCustomFieldResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/custom-fields/${customFieldId}`,
            updateCustomFieldPayload,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateCustomFieldResponse.status === 200) {
            console.log("Campo personalizado atualizado com sucesso!");
            response.json(updateCustomFieldResponse.data);
          } else {
            console.error(`Falha ao atualizar campo personalizado. Código de status: ${updateCustomFieldResponse.status}`);
            response.status(updateCustomFieldResponse.status).send("Failed to update custom field");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update custom field");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/custom-fields/:custom_field_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const customFieldId = request.params.custom_field_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteCustomFieldResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/custom-fields/${customFieldId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteCustomFieldResponse.status === 204) {
            console.log("Campo personalizado excluído com sucesso!");
            response.status(204).send();
          } else {
            console.error(`Falha ao excluir campo personalizado. Código de status: ${deleteCustomFieldResponse.status}`);
            response.status(deleteCustomFieldResponse.status).send("Failed to delete custom field");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete custom field");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/images', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getAllImagesResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/images`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getAllImagesResponse.status === 200) {
            console.log("Imagens do produto obtidas com sucesso!");
            response.json(getAllImagesResponse.data);
          } else {
            console.error(`Falha ao obter imagens do produto. Código de status: ${getAllImagesResponse.status}`);
            response.status(getAllImagesResponse.status).send("Failed to get product images");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product images");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/images', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes da imagem conforme necessário
          const imageDetails = {
            product_id: productId,
            date_modified: new Date().toISOString(),
            is_thumbnail: true,
            sort_order: -2147483648,
            description: "Descrição da imagem",
          };
    
          // Substitua 'image_url' ou 'image_file' conforme necessário
          const imageUrl = 'URL_DA_IMAGEM';  // ou substitua por 'CAMINHO_LOCAL_DA_IMAGEM'
    
          const formData = new FormData();
          formData.append('image_file', fs.createReadStream(imageUrl));
          formData.append('data', JSON.stringify(imageDetails));
    
          const createImageResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/images`,
            formData,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createImageResponse.status === 201) {
            console.log("Imagem do produto criada com sucesso!");
            response.json(createImageResponse.data);
          } else {
            console.error(`Falha ao criar imagem do produto. Código de status: ${createImageResponse.status}`);
            response.status(createImageResponse.status).send("Failed to create product image");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product image");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/images/:image_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const imageId = request.params.image_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getImageResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/images/${imageId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getImageResponse.status === 200) {
            console.log("Imagem do produto obtida com sucesso!");
            response.json(getImageResponse.data);
          } else {
            console.error(`Falha ao obter imagem do produto. Código de status: ${getImageResponse.status}`);
            response.status(getImageResponse.status).send("Failed to get product image");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product image");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/images/:image_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const imageId = request.params.image_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes da imagem conforme necessário
          const imageDetails = {
            product_id: productId,
            image_file: "CAMINHO_LOCAL_DA_IMAGEM",  // ou substitua por 'string' ao usar image_url
            is_thumbnail: true,
            sort_order: -2147483648,
            description: "Descrição da imagem",
          };
    
          const formData = new FormData();
          formData.append('image_file', fs.createReadStream(imageDetails.image_file));
          formData.append('data', JSON.stringify(imageDetails));
    
          const updateImageResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/images/${imageId}`,
            formData,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateImageResponse.status === 200) {
            console.log("Imagem do produto atualizada com sucesso!");
            response.json(updateImageResponse.data);
          } else {
            console.error(`Falha ao atualizar imagem do produto. Código de status: ${updateImageResponse.status}`);
            response.status(updateImageResponse.status).send("Failed to update product image");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update product image");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/images/:image_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const imageId = request.params.image_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteImageResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/images/${imageId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteImageResponse.status === 204) {
            console.log("Imagem do produto excluída com sucesso!");
            response.sendStatus(204);
          } else {
            console.error(`Falha ao excluir imagem do produto. Código de status: ${deleteImageResponse.status}`);
            response.status(deleteImageResponse.status).send("Failed to delete product image");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete product image");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/metafields', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getProductMetafieldsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/metafields`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getProductMetafieldsResponse.status === 200) {
            console.log("Metacampos do produto obtidos com sucesso!");
            response.json(getProductMetafieldsResponse.data);
          } else {
            console.error(`Falha ao obter metacampos do produto. Código de status: ${getProductMetafieldsResponse.status}`);
            response.status(getProductMetafieldsResponse.status).send("Failed to get product metafields");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product metafields");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/metafields', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes do metacampo conforme necessário
          const metafieldDetails = {
            key: "Location",
            value: "4HG",
            namespace: "Warehouse Locations",
            permission_set: "app_only",
            description: "Location in the warehouse",
          };
    
          const createMetafieldResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/metafields`,
            metafieldDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createMetafieldResponse.status === 200) {
            console.log("Metacampo de produto criado com sucesso!");
            response.json(createMetafieldResponse.data);
          } else {
            console.error(`Falha ao criar metacampo de produto. Código de status: ${createMetafieldResponse.status}`);
            response.status(createMetafieldResponse.status).send("Failed to create product metafield");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product metafield");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const metafieldId = request.params.metafield_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getProductMetafieldResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/metafields/${metafieldId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getProductMetafieldResponse.status === 200) {
            console.log("Metacampo do produto obtido com sucesso!");
            response.json(getProductMetafieldResponse.data);
          } else {
            console.error(`Falha ao obter metacampo do produto. Código de status: ${getProductMetafieldResponse.status}`);
            response.status(getProductMetafieldResponse.status).send("Failed to get product metafield");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product metafield");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const metafieldId = request.params.metafield_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes do metacampo conforme necessário
          const updatedMetafieldDetails = {
            // Os campos que podem ser atualizados são definidos aqui
            value: "UpdatedValue",
          };
    
          const updateMetafieldResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/metafields/${metafieldId}`,
            updatedMetafieldDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateMetafieldResponse.status === 200) {
            console.log("Metacampo do produto atualizado com sucesso!");
            response.json(updateMetafieldResponse.data);
          } else {
            console.error(`Falha ao atualizar metacampo do produto. Código de status: ${updateMetafieldResponse.status}`);
            response.status(updateMetafieldResponse.status).send("Failed to update product metafield");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update product metafield");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const metafieldId = request.params.metafield_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteMetafieldResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/metafields/${metafieldId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteMetafieldResponse.status === 204) {
            console.log("Metacampo do produto excluído com sucesso!");
            response.sendStatus(204);
          } else {
            console.error(`Falha ao excluir metacampo do produto. Código de status: ${deleteMetafieldResponse.status}`);
            response.status(deleteMetafieldResponse.status).send("Failed to delete product metafield");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete product metafield");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/reviews', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getProductReviewsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/reviews`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getProductReviewsResponse.status === 200) {
            console.log("Avaliações do produto obtidas com sucesso!");
            response.json(getProductReviewsResponse.data);
          } else {
            console.error(`Falha ao obter avaliações do produto. Código de status: ${getProductReviewsResponse.status}`);
            response.status(getProductReviewsResponse.status).send("Failed to get product reviews");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product reviews");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/reviews', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes da revisão conforme necessário
          const reviewDetails = {
            title: "Review Title",
            text: "Review Text",
            status: "approved",
            rating: 5,
            email: "reviewer@example.com",
            name: "Reviewer Name",
            date_reviewed: "2019-08-24T14:15:22Z",
          };
    
          const createReviewResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/reviews`,
            reviewDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createReviewResponse.status === 201) {
            console.log("Revisão do produto criada com sucesso!");
            response.json(createReviewResponse.data);
          } else {
            console.error(`Falha ao criar revisão do produto. Código de status: ${createReviewResponse.status}`);
            response.status(createReviewResponse.status).send("Failed to create product review");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product review");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/reviews/:review_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const reviewId = request.params.review_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getProductReviewResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/reviews/${reviewId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getProductReviewResponse.status === 200) {
            console.log("Avaliação do produto obtida com sucesso!");
            response.json(getProductReviewResponse.data);
          } else {
            console.error(`Falha ao obter avaliação do produto. Código de status: ${getProductReviewResponse.status}`);
            response.status(getProductReviewResponse.status).send("Failed to get product review");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product review");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/reviews/:review_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const reviewId = request.params.review_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes da revisão conforme necessário
          const reviewDetails = {
            title: "Updated Review Title",
            text: "Updated Review Text",
            status: "approved",
            rating: 4,
            email: "updated_reviewer@example.com",
            name: "Updated Reviewer Name",
            date_reviewed: "2021-11-23T14:15:22Z",
          };
    
          const updateReviewResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/reviews/${reviewId}`,
            reviewDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateReviewResponse.status === 200) {
            console.log("Revisão do produto atualizada com sucesso!");
            response.json(updateReviewResponse.data);
          } else {
            console.error(`Falha ao atualizar revisão do produto. Código de status: ${updateReviewResponse.status}`);
            response.status(updateReviewResponse.status).send("Failed to update product review");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update product review");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/reviews/:review_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const reviewId = request.params.review_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteReviewResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/reviews/${reviewId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteReviewResponse.status === 204) {
            console.log("Revisão do produto excluída com sucesso!");
            response.send("Product review deleted successfully");
          } else {
            console.error(`Falha ao excluir revisão do produto. Código de status: ${deleteReviewResponse.status}`);
            response.status(deleteReviewResponse.status).send("Failed to delete product review");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete product review");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/summary', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getSummaryResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/summary`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getSummaryResponse.status === 200) {
            console.log("Resumo do catálogo obtido com sucesso!");
            response.json(getSummaryResponse.data);
          } else {
            console.error(`Falha ao obter resumo do catálogo. Código de status: ${getSummaryResponse.status}`);
            response.status(getSummaryResponse.status).send("Failed to get catalog summary");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get catalog summary");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/videos', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getVideosResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/videos`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getVideosResponse.status === 200) {
            console.log("Vídeos do produto obtidos com sucesso!");
            response.json(getVideosResponse.data);
          } else {
            console.error(`Falha ao obter vídeos do produto. Código de status: ${getVideosResponse.status}`);
            response.status(getVideosResponse.status).send("Failed to get product videos");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product videos");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/videos', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes do vídeo conforme necessário
          const videoDetails = {
            title: "Writing Great Documentation",
            description: "A video about documentation",
            sort_order: 1,
            type: "youtube",
            video_id: "z3fRu9pkuXE",
          };
    
          const createVideoResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/videos`,
            videoDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createVideoResponse.status === 201) {
            console.log("Vídeo do produto criado com sucesso!");
            response.json(createVideoResponse.data);
          } else {
            console.error(`Falha ao criar vídeo do produto. Código de status: ${createVideoResponse.status}`);
            response.status(createVideoResponse.status).send("Failed to create product video");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product video");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/videos/:id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const videoId = request.params.id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getVideoResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/videos/${videoId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getVideoResponse.status === 200) {
            console.log("Vídeo do produto obtido com sucesso!");
            response.json(getVideoResponse.data);
          } else {
            console.error(`Falha ao obter vídeo do produto. Código de status: ${getVideoResponse.status}`);
            response.status(getVideoResponse.status).send("Failed to get product video");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product video");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/videos/:id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const videoId = request.params.id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes do vídeo conforme necessário
          const videoDetails = {
            title: "Updated Video Title",
            description: "Updated video description",
            sort_order: 2,
            type: "youtube",
            id: 0,
          };
    
          const updateVideoResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/videos/${videoId}`,
            videoDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateVideoResponse.status === 200) {
            console.log("Vídeo do produto atualizado com sucesso!");
            response.json(updateVideoResponse.data);
          } else {
            console.error(`Falha ao atualizar vídeo do produto. Código de status: ${updateVideoResponse.status}`);
            response.status(updateVideoResponse.status).send("Failed to update product video");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update product video");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/videos/:id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const videoId = request.params.id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteVideoResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/videos/${videoId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteVideoResponse.status === 204) {
            console.log("Vídeo do produto excluído com sucesso!");
            response.send("Product video deleted successfully");
          } else {
            console.error(`Falha ao excluir vídeo do produto. Código de status: ${deleteVideoResponse.status}`);
            response.status(deleteVideoResponse.status).send("Failed to delete product video");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete product video");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/modifiers', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getModifiersResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getModifiersResponse.status === 200) {
            console.log("Modificadores de produto obtidos com sucesso!");
            response.json(getModifiersResponse.data);
          } else {
            console.error(`Falha ao obter modificadores de produto. Código de status: ${getModifiersResponse.status}`);
            response.status(getModifiersResponse.status).send("Failed to get product modifiers");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product modifiers");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/modifiers', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes do modificador conforme necessário
          const modifierDetails = {
            type: "checkbox",
            required: true,
            display_name: "Donation",
            sort_order: 0,
            config: {
              // Preencha com detalhes específicos do modificador
            },
            option_values: [
              {
                is_default: false,
                label: "Green",
                sort_order: 0,
                value_data: {},
                adjusters: {
                  price: {
                    adjuster: "relative",
                    adjuster_value: 5,
                  },
                  weight: {
                    adjuster: "relative",
                    adjuster_value: 5,
                  },
                  image_url: "https://cdn8.bigcommerce.com/s-{{store_hash}}/products/184/images/445/naturalcanvascart2_1024x1024__92347__29648.1534344533.1280.1280.jpg?c=2",
                  purchasing_disabled: {
                    status: true,
                    message: "string",
                  },
                },
                id: 0,
              },
            ],
          };
    
          const createModifierResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers`,
            modifierDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createModifierResponse.status === 201) {
            console.log("Modificador de produto criado com sucesso!");
            response.json(createModifierResponse.data);
          } else {
            console.error(`Falha ao criar modificador de produto. Código de status: ${createModifierResponse.status}`);
            response.status(createModifierResponse.status).send("Failed to create product modifier");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product modifier");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/modifiers', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getModifiersResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getModifiersResponse.status === 200) {
            console.log("Modificadores de produto obtidos com sucesso!");
            response.json(getModifiersResponse.data);
          } else {
            console.error(`Falha ao obter modificadores de produto. Código de status: ${getModifiersResponse.status}`);
            response.status(getModifiersResponse.status).send("Failed to get product modifiers");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product modifiers");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/modifiers', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes do modificador conforme necessário
          const modifierDetails = {
            type: "checkbox",
            required: true,
            display_name: "Donation",
            sort_order: 0,
            config: {
              // Preencha com detalhes específicos do modificador
            },
            option_values: [
              {
                is_default: false,
                label: "Green",
                sort_order: 0,
                value_data: {},
                adjusters: {
                  price: {
                    adjuster: "relative",
                    adjuster_value: 5,
                  },
                  weight: {
                    adjuster: "relative",
                    adjuster_value: 5,
                  },
                  image_url: "https://cdn8.bigcommerce.com/s-{{store_hash}}/products/184/images/445/naturalcanvascart2_1024x1024__92347__29648.1534344533.1280.1280.jpg?c=2",
                  purchasing_disabled: {
                    status: true,
                    message: "string",
                  },
                },
                id: 0,
              },
            ],
          };
    
          const createModifierResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers`,
            modifierDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createModifierResponse.status === 201) {
            console.log("Modificador de produto criado com sucesso!");
            response.json(createModifierResponse.data);
          } else {
            console.error(`Falha ao criar modificador de produto. Código de status: ${createModifierResponse.status}`);
            response.status(createModifierResponse.status).send("Failed to create product modifier");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product modifier");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/modifiers/:modifier_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const modifierId = request.params.modifier_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getModifierResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers/${modifierId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getModifierResponse.status === 200) {
            console.log("Modificador de produto obtido com sucesso!");
            response.json(getModifierResponse.data);
          } else {
            console.error(`Falha ao obter modificador de produto. Código de status: ${getModifierResponse.status}`);
            response.status(getModifierResponse.status).send("Failed to get product modifier");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product modifier");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/modifiers/:modifier_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const modifierId = request.params.modifier_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha os detalhes do modificador conforme necessário
          const modifierDetails = {
            type: "date",
            required: true,
            sort_order: 0,
            config: {
              // Preencha com detalhes específicos do modificador
            },
            option_values: [
              {
                id: 0,
              },
            ],
            display_name: "Donation",
          };
    
          const updateModifierResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers/${modifierId}`,
            modifierDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateModifierResponse.status === 200) {
            console.log("Modificador de produto atualizado com sucesso!");
            response.json(updateModifierResponse.data);
          } else {
            console.error(`Falha ao atualizar modificador de produto. Código de status: ${updateModifierResponse.status}`);
            response.status(updateModifierResponse.status).send("Failed to update product modifier");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update product modifier");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/modifiers/:modifier_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const modifierId = request.params.modifier_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteModifierResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers/${modifierId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteModifierResponse.status === 204) {
            console.log("Modificador de produto excluído com sucesso!");
            response.sendStatus(204);
          } else {
            console.error(`Falha ao excluir modificador de produto. Código de status: ${deleteModifierResponse.status}`);
            response.status(deleteModifierResponse.status).send("Failed to delete product modifier");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete product modifier");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/modifiers/:modifier_id/values/:value_id/image', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const modifierId = request.params.modifier_id;
          const valueId = request.params.value_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes da imagem do modificador
          const imageDetails = {
            data: {
              image_url: "https://cdn8.bigcommerce.com/s-id30h7ohwf/product_images/attribute_rule_images/85_source_1536863430.png",
            },
            meta: {},
          };
    
          const createImageResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers/${modifierId}/values/${valueId}/image`,
            imageDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createImageResponse.status === 200) {
            console.log("Imagem modificadora criada com sucesso!");
            response.json(createImageResponse.data);
          } else {
            console.error(`Falha ao criar imagem modificadora. Código de status: ${createImageResponse.status}`);
            response.status(createImageResponse.status).send("Failed to create modifier image");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create modifier image");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/modifiers/:modifier_id/values', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const modifierId = request.params.modifier_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getModifierValuesResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers/${modifierId}/values`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getModifierValuesResponse.status === 200) {
            console.log("Valores do modificador obtidos com sucesso!");
            response.json(getModifierValuesResponse.data);
          } else {
            console.error(`Falha ao obter valores do modificador. Código de status: ${getModifierValuesResponse.status}`);
            response.status(getModifierValuesResponse.status).send("Failed to get modifier values");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get modifier values");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/modifiers/:modifier_id/values', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const modifierId = request.params.modifier_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes do valor do modificador
          const modifierValueDetails = {
            is_default: false,
            label: "Green",
            sort_order: 0,
            value_data: {},
            adjusters: {
              price: {
                adjuster: "relative",
                adjuster_value: 5,
              },
              weight: {
                adjuster: "relative",
                adjuster_value: 5,
              },
              image_url: `https://cdn8.bigcommerce.com/s-${storeHash}/products/184/images/445/naturalcanvascart2_1024x1024__92347__29648.1534344533.1280.1280.jpg?c=2`,
              purchasing_disabled: {
                status: true,
                message: "string",
              },
            },
          };
    
          const createModifierValueResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers/${modifierId}/values`,
            modifierValueDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createModifierValueResponse.status === 200) {
            console.log("Valor do modificador criado com sucesso!");
            response.json(createModifierValueResponse.data);
          } else {
            console.error(`Falha ao criar valor do modificador. Código de status: ${createModifierValueResponse.status}`);
            response.status(createModifierValueResponse.status).send("Failed to create modifier value");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create modifier value");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/modifiers/:modifier_id/values/:value_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const modifierId = request.params.modifier_id;
          const valueId = request.params.value_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getModifierValueResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers/${modifierId}/values/${valueId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getModifierValueResponse.status === 200) {
            console.log("Valor do modificador obtido com sucesso!");
            response.json(getModifierValueResponse.data);
          } else {
            console.error(`Falha ao obter valor do modificador. Código de status: ${getModifierValueResponse.status}`);
            response.status(getModifierValueResponse.status).send("Failed to get modifier value");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get modifier value");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/modifiers/:modifier_id/values/:value_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const modifierId = request.params.modifier_id;
          const valueId = request.params.value_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes do valor do modificador para atualização
          const updatedModifierValueDetails = {
            is_default: false,
            label: "Green",
            sort_order: 0,
            value_data: {},
            adjusters: {
              price: {
                adjuster: "relative",
                adjuster_value: 5,
              },
              weight: {
                adjuster: "relative",
                adjuster_value: 5,
              },
              image_url: `https://cdn8.bigcommerce.com/s-${storeHash}/products/184/images/445/naturalcanvascart2_1024x1024__92347__29648.1534344533.1280.1280.jpg?c=2`,
              purchasing_disabled: {
                status: true,
                message: "string",
              },
            },
            id: 0,
          };
    
          const updateModifierValueResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers/${modifierId}/values/${valueId}`,
            updatedModifierValueDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateModifierValueResponse.status === 200) {
            console.log("Valor do modificador atualizado com sucesso!");
            response.json(updateModifierValueResponse.data);
          } else {
            console.error(`Falha ao atualizar valor do modificador. Código de status: ${updateModifierValueResponse.status}`);
            response.status(updateModifierValueResponse.status).send("Failed to update modifier value");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update modifier value");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/modifiers/:modifier_id/values/:value_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const modifierId = request.params.modifier_id;
          const valueId = request.params.value_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteModifierValueResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/modifiers/${modifierId}/values/${valueId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteModifierValueResponse.status === 204) {
            console.log("Valor do modificador excluído com sucesso!");
            response.sendStatus(204);
          } else {
            console.error(`Falha ao excluir valor do modificador. Código de status: ${deleteModifierValueResponse.status}`);
            response.status(deleteModifierValueResponse.status).send("Failed to delete modifier value");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete modifier value");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/variants', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getAllVariantsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getAllVariantsResponse.status === 200) {
            console.log("Variantes do produto obtidas com sucesso!");
            response.json(getAllVariantsResponse.data);
          } else {
            console.error(`Falha ao obter variantes do produto. Código de status: ${getAllVariantsResponse.status}`);
            response.status(getAllVariantsResponse.status).send("Failed to get product variants");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product variants");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/variants', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes da variante do produto
          const variantDetails = {
            sku: "variant_sku",
            option_values: [
              {
                option_display_name: "Color",
                label: "Beige",
                id: 146,
                option_id: 151,
              },
            ],
            // Outros campos obrigatórios conforme sua necessidade
          };
    
          const createVariantResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants`,
            variantDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createVariantResponse.status === 200) {
            console.log("Variante do produto criada com sucesso!");
            response.json(createVariantResponse.data);
          } else {
            console.error(`Falha ao criar variante do produto. Código de status: ${createVariantResponse.status}`);
            response.status(createVariantResponse.status).send("Failed to create product variant");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product variant");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/variants/:variant_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const variantId = request.params.variant_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getProductVariantResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants/${variantId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getProductVariantResponse.status === 200) {
            console.log("Variante do produto obtida com sucesso!");
            response.json(getProductVariantResponse.data);
          } else {
            console.error(`Falha ao obter variante do produto. Código de status: ${getProductVariantResponse.status}`);
            response.status(getProductVariantResponse.status).send("Failed to get product variant");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product variant");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/variants/:variant_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const variantId = request.params.variant_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes da atualização da variante do produto
          const variantUpdateDetails = {
            // Campos que você deseja atualizar conforme necessário
            // Exemplo: price, weight, height, etc.
          };
    
          const updateVariantResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants/${variantId}`,
            variantUpdateDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateVariantResponse.status === 200) {
            console.log("Variante do produto atualizada com sucesso!");
            response.json(updateVariantResponse.data);
          } else {
            console.error(`Falha ao atualizar variante do produto. Código de status: ${updateVariantResponse.status}`);
            response.status(updateVariantResponse.status).send("Failed to update product variant");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update product variant");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/variants/:variant_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const variantId = request.params.variant_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteVariantResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants/${variantId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteVariantResponse.status === 204) {
            console.log("Variante do produto excluída com sucesso!");
            response.sendStatus(204);
          } else {
            console.error(`Falha ao excluir variante do produto. Código de status: ${deleteVariantResponse.status}`);
            response.status(deleteVariantResponse.status).send("Failed to delete product variant");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete product variant");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/variants/:variant_id/image', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const variantId = request.params.variant_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Substitua 'IMAGE_URL' pelo URL da imagem que deseja associar à variante
          const imageUrl = 'IMAGE_URL';
    
          const createImageResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants/${variantId}/image`,
            {
              data: {
                image_url: imageUrl,
              },
              meta: {},
            },
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createImageResponse.status === 200) {
            console.log("Imagem de variante criada com sucesso!");
            response.json(createImageResponse.data);
          } else {
            console.error(`Falha ao criar imagem de variante. Código de status: ${createImageResponse.status}`);
            response.status(createImageResponse.status).send("Failed to create variant image");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create variant image");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/variants/:variant_id/metafields', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const variantId = request.params.variant_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getMetafieldsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants/${variantId}/metafields`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getMetafieldsResponse.status === 200) {
            console.log("Metacampos de variante obtidos com sucesso!");
            response.json(getMetafieldsResponse.data);
          } else {
            console.error(`Falha ao obter metacampos de variante. Código de status: ${getMetafieldsResponse.status}`);
            response.status(getMetafieldsResponse.status).send("Failed to get variant metafields");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get variant metafields");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/variants/:variant_id/metafields', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const variantId = request.params.variant_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes do novo metacampo
          const metafieldDetails = {
            key: "Location",
            value: "4HG",
            namespace: "Warehouse Locations",
            permission_set: "app_only",
            description: "Location in the warehouse",
          };
    
          const createMetafieldResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants/${variantId}/metafields`,
            metafieldDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createMetafieldResponse.status === 200) {
            console.log("Metacampo de variante criado com sucesso!");
            response.json(createMetafieldResponse.data);
          } else {
            console.error(`Falha ao criar metacampo de variante. Código de status: ${createMetafieldResponse.status}`);
            response.status(createMetafieldResponse.status).send("Failed to create variant metafield");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create variant metafield");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/variants/:variant_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const variantId = request.params.variant_id;
          const metafieldId = request.params.metafield_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getMetafieldResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants/${variantId}/metafields/${metafieldId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getMetafieldResponse.status === 200) {
            console.log("Metacampo de variante obtido com sucesso!");
            response.json(getMetafieldResponse.data);
          } else {
            console.error(`Falha ao obter metacampo de variante. Código de status: ${getMetafieldResponse.status}`);
            response.status(getMetafieldResponse.status).send("Failed to get variant metafield");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get variant metafield");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/variants/:variant_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const variantId = request.params.variant_id;
          const metafieldId = request.params.metafield_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes atualizados do metacampo
          const updatedMetafieldDetails = {
            key: "Location",
            value: "UpdatedValue",
            namespace: "Warehouse Locations",
            permission_set: "app_only",
            description: "Updated description",
          };
    
          const updateMetafieldResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants/${variantId}/metafields/${metafieldId}`,
            updatedMetafieldDetails,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateMetafieldResponse.status === 200) {
            console.log("Metacampo de variante atualizado com sucesso!");
            response.json(updateMetafieldResponse.data);
          } else {
            console.error(`Falha ao atualizar metacampo de variante. Código de status: ${updateMetafieldResponse.status}`);
            response.status(updateMetafieldResponse.status).send("Failed to update variant metafield");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update variant metafield");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/variants/:variant_id/metafields/:metafield_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const variantId = request.params.variant_id;
          const metafieldId = request.params.metafield_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteMetafieldResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/variants/${variantId}/metafields/${metafieldId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteMetafieldResponse.status === 204) {
            console.log("Metacampo de variante excluído com sucesso!");
            response.sendStatus(204);
          } else {
            console.error(`Falha ao excluir metacampo de variante. Código de status: ${deleteMetafieldResponse.status}`);
            response.status(deleteMetafieldResponse.status).send("Failed to delete variant metafield");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete variant metafield");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/variants', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getAllVariantsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/variants`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
              params: request.query,
            }
          );
    
          if (getAllVariantsResponse.status === 200) {
            console.log("Variantes obtidas com sucesso!");
            response.json(getAllVariantsResponse.data);
          } else {
            console.error(`Falha ao obter variantes. Código de status: ${getAllVariantsResponse.status}`);
            response.status(getAllVariantsResponse.status).send("Failed to get variants");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get variants");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/variants', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes atualizados das variantes em lote
          const updatedVariantsBatch = [
            {
              id: 154,
              cost_price: 40,
              price: 40,
              sale_price: 40,
              retail_price: 40,
              weight: 5,
              width: 5,
              height: 5,
              depth: 5,
              is_free_shipping: true,
              fixed_cost_shipping_price: 0,
              purchasing_disabled: true,
              purchasing_disabled_message: "string",
              upc: "1234",
              inventory_level: 21474,
              inventory_warning_level: 5474,
              bin_picking_number: "string",
            },
            // Adicione mais variantes conforme necessário
          ];
    
          const updateVariantsBatchResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/variants`,
            updatedVariantsBatch,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateVariantsBatchResponse.status === 200) {
            console.log("Variantes atualizadas com sucesso!");
            response.json(updateVariantsBatchResponse.data);
          } else {
            console.error(`Falha ao atualizar variantes. Código de status: ${updateVariantsBatchResponse.status}`);
            response.status(updateVariantsBatchResponse.status).send("Failed to update variants");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update variants");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/options', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getAllProductOptionsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
              params: request.query,
            }
          );
    
          if (getAllProductOptionsResponse.status === 200) {
            console.log("Opções de variantes do produto obtidas com sucesso!");
            response.json(getAllProductOptionsResponse.data);
          } else {
            console.error(`Falha ao obter opções de variantes do produto. Código de status: ${getAllProductOptionsResponse.status}`);
            response.status(getAllProductOptionsResponse.status).send("Failed to get product options");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product options");
        }
    
      });
};
    routes.post('/stores/:store_hash/v3/catalog/products/:product_id/options', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes da nova opção de variante
          const newProductOption = {
            product_id: productId,
            name: "Add-a-$5-Donation1535042499-187",
            type: "radio_buttons",
            config: {
              // Preencha com as configurações específicas da opção, se necessário
            },
            sort_order: 1,
            option_values: [
              {
                is_default: false,
                label: "Green",
                sort_order: 0,
                value_data: {},
                id: 0,
              },
            ],
          };
    
          const createProductOptionResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options`,
            newProductOption,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createProductOptionResponse.status === 201) {
            console.log("Opção de variante do produto criada com sucesso!");
            response.json(createProductOptionResponse.data);
          } else {
            console.error(`Falha ao criar opção de variante do produto. Código de status: ${createProductOptionResponse.status}`);
            response.status(createProductOptionResponse.status).send("Failed to create product option");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product option");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/options/:option_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const optionId = request.params.option_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getProductOptionResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options/${optionId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
              params: request.query,
            }
          );
    
          if (getProductOptionResponse.status === 200) {
            console.log("Opção de variante do produto obtida com sucesso!");
            response.json(getProductOptionResponse.data);
          } else {
            console.error(`Falha ao obter opção de variante do produto. Código de status: ${getProductOptionResponse.status}`);
            response.status(getProductOptionResponse.status).send("Failed to get product option");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product option");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/options', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getAllProductOptionsResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
              params: request.query,
            }
          );
    
          if (getAllProductOptionsResponse.status === 200) {
            console.log("Opções de variantes do produto obtidas com sucesso!");
            response.json(getAllProductOptionsResponse.data);
          } else {
            console.error(`Falha ao obter opções de variantes do produto. Código de status: ${getAllProductOptionsResponse.status}`);
            response.status(getAllProductOptionsResponse.status).send("Failed to get product options");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product options");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/options', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes da nova opção de variante
          const newProductOption = {
            product_id: productId,
            name: "Add-a-$5-Donation1535042499-187",
            type: "radio_buttons",
            config: {
              // Preencha com as configurações específicas da opção, se necessário
            },
            sort_order: 1,
            option_values: [
              {
                is_default: false,
                label: "Green",
                sort_order: 0,
                value_data: {},
                id: 0,
              },
            ],
          };
    
          const createProductOptionResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options`,
            newProductOption,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createProductOptionResponse.status === 201) {
            console.log("Opção de variante do produto criada com sucesso!");
            response.json(createProductOptionResponse.data);
          } else {
            console.error(`Falha ao criar opção de variante do produto. Código de status: ${createProductOptionResponse.status}`);
            response.status(createProductOptionResponse.status).send("Failed to create product option");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product option");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/options/:option_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const optionId = request.params.option_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getProductOptionResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options/${optionId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
              params: request.query,
            }
          );
    
          if (getProductOptionResponse.status === 200) {
            console.log("Opção de variante do produto obtida com sucesso!");
            response.json(getProductOptionResponse.data);
          } else {
            console.error(`Falha ao obter opção de variante do produto. Código de status: ${getProductOptionResponse.status}`);
            response.status(getProductOptionResponse.status).send("Failed to get product option");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product option");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/options/:option_id/values', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const optionId = request.params.option_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getProductOptionValuesResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options/${optionId}/values`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getProductOptionValuesResponse.status === 200) {
            console.log("Valores de opção de variante do produto obtidos com sucesso!");
            response.json(getProductOptionValuesResponse.data);
          } else {
            console.error(`Falha ao obter valores de opção de variante do produto. Código de status: ${getProductOptionValuesResponse.status}`);
            response.status(getProductOptionValuesResponse.status).send("Failed to get product option values");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product option values");
        }
      });
      routes.post('/stores/:store_hash/v3/catalog/products/:product_id/options/:option_id/values', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const optionId = request.params.option_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes do novo valor de opção de variante
          const newProductOptionValue = {
            is_default: false,
            label: "Green",
            sort_order: 0,
            value_data: {},
          };
    
          const createProductOptionValueResponse: AxiosResponse = await axios.post(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options/${optionId}/values`,
            newProductOptionValue,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (createProductOptionValueResponse.status === 201) {
            console.log("Valor de opção de variante do produto criado com sucesso!");
            response.json(createProductOptionValueResponse.data);
          } else {
            console.error(`Falha ao criar valor de opção de variante do produto. Código de status: ${createProductOptionValueResponse.status}`);
            response.status(createProductOptionValueResponse.status).send("Failed to create product option value");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to create product option value");
        }
      });
      routes.get('/stores/:store_hash/v3/catalog/products/:product_id/options/:option_id/values/:value_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const optionId = request.params.option_id;
          const valueId = request.params.value_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const getProductOptionValueResponse: AxiosResponse = await axios.get(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options/${optionId}/values/${valueId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (getProductOptionValueResponse.status === 200) {
            console.log("Valor de opção de variante do produto obtido com sucesso!");
            response.json(getProductOptionValueResponse.data);
          } else {
            console.error(`Falha ao obter valor de opção de variante do produto. Código de status: ${getProductOptionValueResponse.status}`);
            response.status(getProductOptionValueResponse.status).send("Failed to get product option value");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to get product option value");
        }
      });
      routes.put('/stores/:store_hash/v3/catalog/products/:product_id/options/:option_id/values/:value_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const optionId = request.params.option_id;
          const valueId = request.params.value_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          // Preencha com os detalhes atualizados do valor de opção de variante
          const updatedProductOptionValue = {
            is_default: false,
            label: "Green",
            sort_order: 0,
            value_data: {},
            id: 0, // Substitua pelo ID real do valor de opção que está sendo atualizado
          };
    
          const updateProductOptionValueResponse: AxiosResponse = await axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options/${optionId}/values/${valueId}`,
            updatedProductOptionValue,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (updateProductOptionValueResponse.status === 200) {
            console.log("Valor de opção de variante do produto atualizado com sucesso!");
            response.json(updateProductOptionValueResponse.data);
          } else {
            console.error(`Falha ao atualizar valor de opção de variante do produto. Código de status: ${updateProductOptionValueResponse.status}`);
            response.status(updateProductOptionValueResponse.status).send("Failed to update product option value");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to update product option value");
        }
      });
      routes.delete('/stores/:store_hash/v3/catalog/products/:product_id/options/:option_id/values/:value_id', async (request: Request, response: Response) => {
        try {
          const storeHash = request.params.store_hash;
          const productId = request.params.product_id;
          const optionId = request.params.option_id;
          const valueId = request.params.value_id;
    
          // Substitua 'YOUR_API_KEY' pelo seu token de autenticação
          const authToken = 'YOUR_API_KEY';
    
          const deleteProductOptionValueResponse: AxiosResponse = await axios.delete(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${productId}/options/${optionId}/values/${valueId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken,
              },
            }
          );
    
          if (deleteProductOptionValueResponse.status === 204) {
            console.log("Valor de opção de variante do produto excluído com sucesso!");
            response.status(204).send();
          } else {
            console.error(`Falha ao excluir valor de opção de variante do produto. Código de status: ${deleteProductOptionValueResponse.status}`);
            response.status(deleteProductOptionValueResponse.status).send("Failed to delete product option value");
          }
        } catch (error) {
          console.error(error);
          response.status(500).send("Failed to delete product option value");
        }
      });
};