import { Request, Response, Router } from "express";
import axios, { AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'https://sellingpartnerapi-na.amazon.com'

// ... (código anterior)
export const setRoutes = (routes: Router) => {
    routes.get('/v1/amazon/getAuthorizationCode', async (request: Request, response: Response) => {
        try {
            const { sellingPartnerId, developerId, mwsAuthToken } = request.query;

            // Verifica se os parâmetros necessários foram fornecidos
            if (!sellingPartnerId || !developerId || !mwsAuthToken) {
                return response.status(400).json({
                    code: 'BadRequest',
                    message: 'Request has missing or invalid parameters and cannot be parsed.',
                });
            }

            // Chama a API da Amazon para obter o código de autorização
            const authorizationCodeResponse = await axios.get('https://sellingpartnerapi-na.amazon.com/authorization/v1/authorizationCode', {
                params: {
                    sellingPartnerId,
                    developerId,
                    mwsAuthToken,
                },
                headers: {
                    'Accept': 'application/json',
                    // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
                },
            });

            response.json(authorizationCodeResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    // ... (código anterior)

routes.get('/v1/amazon/contentDocuments', async (request: Request, response: Response) => {
    try {
        const { marketplaceId, pageToken } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!marketplaceId) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para buscar documentos de conteúdo A+
        const searchContentDocumentsResponse = await axios.get('https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments', {
            params: {
                marketplaceId,
                pageToken,
            },
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(searchContentDocumentsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

routes.post('/v1/amazon/contentDocuments', async (request: Request, response: Response) => {
    try {
        const { marketplaceId } = request.query;
        const postContentDocumentRequest = request.body;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!marketplaceId || !postContentDocumentRequest) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para criar um novo documento de conteúdo A+
        const createContentDocumentResponse = await axios.post(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments?marketplaceId=${marketplaceId}`, postContentDocumentRequest, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(createContentDocumentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

routes.get('/v1/amazon/contentDocuments/:contentReferenceKey', async (request: Request, response: Response) => {
    try {
        const { contentReferenceKey, marketplaceId, includedDataSet } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!contentReferenceKey || !marketplaceId) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para obter um documento de conteúdo A+
        const getContentDocumentResponse = await axios.get(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentReferenceKey}`, {
            params: {
                marketplaceId,
                includedDataSet,
            },
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(getContentDocumentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

routes.post('/v1/amazon/contentDocuments/:contentReferenceKey', async (request: Request, response: Response) => {
    try {
        const { contentReferenceKey, marketplaceId } = request.query;
        const postContentDocumentRequest = request.body;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!contentReferenceKey || !marketplaceId || !postContentDocumentRequest) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para atualizar um documento de conteúdo A+
        const updateContentDocumentResponse = await axios.post(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentReferenceKey}?marketplaceId=${marketplaceId}`, postContentDocumentRequest, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(updateContentDocumentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// ... (código posterior)
// ... (código anterior)

routes.get('/v1/amazon/contentDocuments/:contentReferenceKey/asins', async (request: Request, response: Response) => {
    try {
        const { contentReferenceKey, marketplaceId, includedDataSet, asinSet, pageToken } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!contentReferenceKey || !marketplaceId) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para obter a lista de ASINs relacionados ao documento de conteúdo A+
        const listContentDocumentAsinRelationsResponse = await axios.get(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentReferenceKey}/asins`, {
            params: {
                marketplaceId,
                includedDataSet,
                asinSet,
                pageToken,
            },
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(listContentDocumentAsinRelationsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

routes.post('/v1/amazon/contentDocuments/:contentReferenceKey/asins', async (request: Request, response: Response) => {
    try {
        const { contentReferenceKey, marketplaceId } = request.query;
        const postContentDocumentAsinRelationsRequest = request.body;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!contentReferenceKey || !marketplaceId || !postContentDocumentAsinRelationsRequest) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para substituir todas as ASINs relacionadas ao documento de conteúdo A+
        const postContentDocumentAsinRelationsResponse = await axios.post(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentReferenceKey}/asins?marketplaceId=${marketplaceId}`, postContentDocumentAsinRelationsRequest, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(postContentDocumentAsinRelationsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

routes.post('/v1/amazon/contentAsinValidations', async (request: Request, response: Response) => {
    try {
        const { marketplaceId, asinSet } = request.query;
        const postContentDocumentRequest = request.body;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!marketplaceId || !postContentDocumentRequest) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para validar o documento de conteúdo A+ para um conjunto de ASINs
        const validateContentDocumentAsinRelationsResponse = await axios.post('https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentAsinValidations', postContentDocumentRequest, {
            params: {
                marketplaceId,
                asinSet,
            },
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(validateContentDocumentAsinRelationsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

routes.get('/v1/amazon/contentPublishRecords', async (request: Request, response: Response) => {
    try {
        const { marketplaceId, asin, pageToken } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!marketplaceId || !asin) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para buscar registros de publicação de conteúdo A+
        const searchContentPublishRecordsResponse = await axios.get('https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentPublishRecords', {
            params: {
                marketplaceId,
                asin,
                pageToken,
            },
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(searchContentPublishRecordsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// ... (código posterior)
// ... (código anterior)

routes.post('/v1/amazon/contentDocuments/:contentReferenceKey/approvalSubmissions', async (request: Request, response: Response) => {
    try {
        const { contentReferenceKey, marketplaceId } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!contentReferenceKey || !marketplaceId) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para enviar um documento de conteúdo A+ para revisão, aprovação e publicação
        const postContentDocumentApprovalSubmissionResponse = await axios.post(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentReferenceKey}/approvalSubmissions?marketplaceId=${marketplaceId}`, null, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(postContentDocumentApprovalSubmissionResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

routes.post('/v1/amazon/contentDocuments/:contentReferenceKey/suspendSubmissions', async (request: Request, response: Response) => {
    try {
        const { contentReferenceKey, marketplaceId } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!contentReferenceKey || !marketplaceId) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para enviar uma solicitação de suspensão de conteúdo A+
        const postContentDocumentSuspendSubmissionResponse = await axios.post(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentReferenceKey}/suspendSubmissions?marketplaceId=${marketplaceId}`, null, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(postContentDocumentSuspendSubmissionResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// ... (código posterior)
routes.get('/v1/amazon/content/:contentReferenceKey/metadata', async (request: Request, response: Response) => {
    try {
        const { contentReferenceKey } = request.params;

        // Verifica se o parâmetro necessário foi fornecido
        if (!contentReferenceKey) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para obter metadados de conteúdo
        const contentMetadataResponse = await axios.get(`https://sellingpartnerapi-na.amazon.com/content/${contentReferenceKey}/metadata`, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(contentMetadataResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota fictícia para obter registros de publicação de conteúdo
routes.get('/v1/amazon/contentPublishRecords', async (request: Request, response: Response) => {
    try {
        const { marketplaceId, asin, pageToken } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!marketplaceId) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para buscar registros de publicação de conteúdo
        const contentPublishRecordsResponse = await axios.get(`https://sellingpartnerapi-na.amazon.com/contentPublishRecords?marketplaceId=${marketplaceId}&asin=${asin}&pageToken=${pageToken}`, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(contentPublishRecordsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
routes.get('/content-documents', async (request: Request, response: Response) => {
    try {
        const { marketplaceId, contentType, status } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!marketplaceId) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Amazon para buscar documentos de conteúdo A+
        const contentDocumentsResponse = await axios.get('https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments', {
            params: {
                marketplaceId,
                contentType,
                status,
            },
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(contentDocumentsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Obter Documento de Conteúdo A+
routes.get('/content-documents/:contentDocumentId', async (request: Request, response: Response) => {
    try {
        const { contentDocumentId } = request.params;

        // Chama a API da Amazon para obter detalhes de um documento de conteúdo A+
        const contentDocumentResponse = await axios.get(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentDocumentId}`, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(contentDocumentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Enviar Documento de Conteúdo A+
routes.post('/content-documents', async (request: Request, response: Response) => {
    try {
        const contentDocument = request.body;

        // Verifica se o corpo da solicitação contém um documento de conteúdo A+
        if (!contentDocument) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request body does not contain a valid Content Document.',
            });
        }

        // Chama a API da Amazon para enviar um novo documento de conteúdo A+
        const submitContentDocumentResponse = await axios.post('https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments', contentDocument, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json({ contentReferenceKey: submitContentDocumentResponse.data.contentReferenceKey });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Listar Relações de ASIN de um Documento de Conteúdo A+
routes.get('/content-documents/:contentDocumentId/asin-relations', async (request: Request, response: Response) => {
    try {
        const { contentDocumentId } = request.params;

        // Chama a API da Amazon para listar relações de ASIN de um documento de conteúdo A+
        const asinRelationsResponse = await axios.get(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentDocumentId}/asin-relations`, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(asinRelationsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Enviar Relações de ASIN para um Documento de Conteúdo A+
routes.post('/content-documents/:contentDocumentId/asin-relations', async (request: Request, response: Response) => {
    try {
        const { contentDocumentId } = request.params;
        const asinRelations = request.body;

        // Verifica se o corpo da solicitação contém relações de ASIN
        if (!asinRelations) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request body does not contain valid ASIN relations.',
            });
        }

        // Chama a API da Amazon para enviar relações de ASIN para um documento de conteúdo A+
        const submitAsinRelationsResponse = await axios.post(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentDocumentId}/asin-relations`, asinRelations, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(submitAsinRelationsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Validar Relações de ASIN de um Documento de Conteúdo A+
routes.post('/content-documents/:contentDocumentId/validate-asin-relations', async (request: Request, response: Response) => {
    try {
        const { contentDocumentId } = request.params;

        // Chama a API da Amazon para validar relações de ASIN de um documento de conteúdo A+
        const validateAsinRelationsResponse = await axios.post(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentDocumentId}/validate-asin-relations`, null, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(validateAsinRelationsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Buscar Registros de Publicação de Conteúdo A+
routes.get('/content-publish-records', async (request: Request, response: Response) => {
    try {
        const { marketplaceId, locale, asin } = request.query;

        // Chama a API da Amazon para buscar registros de publicação de conteúdo A+
        const publishRecordsResponse = await axios.get('https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentPublishRecords', {
            params: {
                marketplaceId,
                locale,
                asin,
            },
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(publishRecordsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Enviar Documento de Conteúdo A+ para Aprovação
routes.post('/content-documents/:contentDocumentId/submit-for-approval', async (request: Request, response: Response) => {
    try {
        const { contentDocumentId } = request.params;

        // Chama a API da Amazon para enviar um documento de conteúdo A+ para aprovação
        const submitForApprovalResponse = await axios.post(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentDocumentId}/submit-for-approval`, null, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(submitForApprovalResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Suspender Envio de Documento de Conteúdo A+
routes.post('/content-documents/:contentDocumentId/suspend-submission', async (request: Request, response: Response) => {
    try {
        const { contentDocumentId } = request.params;

        // Chama a API da Amazon para suspender o envio de um documento de conteúdo A+
        const suspendSubmissionResponse = await axios.post(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentDocumentId}/suspend-submission`, null, {
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(suspendSubmissionResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
routes.get('/catalog/2022-04-01/items', async (request: Request, response: Response) => {
    try {
        const {
            identifiers,
            identifiersType,
            marketplaceIds,
            includedData,
            locale,
            sellerId,
            keywords,
            brandNames,
            classificationIds,
            pageSize,
            pageToken,
            keywordsLocale,
        } = request.query;

        // Chama a API da Amazon para pesquisar itens do catálogo
        const searchCatalogItemsResponse = await axios.get('https://sellingpartnerapi-na.amazon.com/catalog/2022-04-01/items', {
            params: {
                identifiers,
                identifiersType,
                marketplaceIds,
                includedData,
                locale,
                sellerId,
                keywords,
                brandNames,
                classificationIds,
                pageSize,
                pageToken,
                keywordsLocale,
            },
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(searchCatalogItemsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(error.response?.status || 500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Obter Detalhes do Item do Catálogo
routes.get('/catalog/2022-04-01/items/:asin', async (request: Request, response: Response) => {
    try {
        const { asin } = request.params;
        const { marketplaceIds, includedData, locale } = request.query;

        // Chama a API da Amazon para obter detalhes de um item do catálogo
        const getCatalogItemResponse = await axios.get(`https://sellingpartnerapi-na.amazon.com/catalog/2022-04-01/items/${asin}`, {
            params: {
                marketplaceIds,
                includedData,
                locale,
            },
            headers: {
                'Accept': 'application/json',
                // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
            },
        });

        response.json(getCatalogItemResponse.data);
    } catch (error) {
        console.error(error);
        response.status(error.response?.status || 500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
routes.get('/catalog/2022-04-01/items', async (request: Request, response: Response) => {
    try {
      const { identifiers, identifiersType, marketplaceIds, includedData, locale, sellerId, keywords, brandNames, classificationIds, pageSize, pageToken, keywordsLocale } = request.query;

      // Chama a API da Amazon para pesquisar itens do catálogo
      const searchCatalogItemsResponse = await axios.get('https://sellingpartnerapi-na.amazon.com/catalog/2022-04-01/items', {
        params: {
          identifiers,
          identifiersType,
          marketplaceIds,
          includedData,
          locale,
          sellerId,
          keywords,
          brandNames,
          classificationIds,
          pageSize,
          pageToken,
          keywordsLocale,
        },
        headers: {
          'Accept': 'application/json',
          // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
        },
      });

      response.json(searchCatalogItemsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(error.response?.status || 500).json({
        code: 'InternalServerError',
        message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
      });
    }
  });
  routes.get('/catalog/2022-04-01/items/:asin', async (request: Request, response: Response) => {
    try {
      const { asin } = request.params;
      const { marketplaceIds, includedData, locale } = request.query;

      // Chama a API da Amazon para obter detalhes de um item do catálogo
      const getCatalogItemResponse = await axios.get(`https://sellingpartnerapi-na.amazon.com/catalog/2022-04-01/items/${asin}`, {
        params: {
          marketplaceIds,
          includedData,
          locale,
        },
        headers: {
          'Accept': 'application/json',
          // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
        },
      });

      response.json(getCatalogItemResponse.data);
    } catch (error) {
      console.error(error);
      response.status(error.response?.status || 500).json({
        code: 'InternalServerError',
        message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
      });
    }
  });
  routes.get('/content-documents', async (request: Request, response: Response) => {
    try {
      const { marketplaceId, contentType, status } = request.query;

      // Chama a API da Amazon para buscar documentos de conteúdo A+
      const searchContentDocumentsResponse = await axios.get('https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments', {
        params: {
          marketplaceId,
          contentType,
          status,
        },
        headers: {
          'Accept': 'application/json',
          // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
        },
      });

      response.json(searchContentDocumentsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(error.response?.status || 500).json({
        code: 'InternalServerError',
        message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
      });
    }
  });
  routes.get('/content-documents/:contentDocumentId', async (request: Request, response: Response) => {
    try {
      const { contentDocumentId } = request.params;

      // Chama a API da Amazon para obter detalhes de um documento de Conteúdo A+
      const getContentDocumentResponse = await axios.get(`https://sellingpartnerapi-na.amazon.com/aplus/2020-11-01/contentDocuments/${contentDocumentId}`, {
        headers: {
          'Accept': 'application/json',
          // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
        },
      });

      response.json(getContentDocumentResponse.data);
    } catch (error) {
      console.error(error);
      response.status(error.response?.status || 500).json({
        code: 'InternalServerError',
        message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
      });
    }
  });

  // Enviar Documento de Conteúdo A+
  routes.post('/content-documents', async (request: Request, response: Response) => {
    try {
      // Lógica para enviar um novo documento de Conteúdo A+
      // ...

      response.json({ message: 'Documento de Conteúdo A+ enviado com sucesso!' });
    } catch (error) {
      console.error(error);
      response.status(error.response?.status || 500).json({
        code: 'InternalServerError',
        message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
      });
    }
  });
  routes.get('/catalog/item/:asin/attributes', async (req: Request, res: Response) => {
    try {
      const { asin } = req.params;
      const { marketplaceIds, includedData, locale } = req.query;

      const response = await axios.get(`https://sellingpartnerapi-na.amazon.com/catalog/2022-04-01/items/${asin}`, {
        params: {
          marketplaceIds,
          includedData,
          locale,
        },
        headers: {
          'Accept': 'application/json',
          // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
        },
      });

      // Extrair e retornar apenas os atributos do item
      const itemAttributes = response.data.attributes;
      res.json(itemAttributes);
    } catch (error) {
      console.error(error);
      res.status(error.response?.status || 500).json({
        code: 'InternalServerError',
        message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
      });
    }
  });
  routes.get('/catalog/item/:asin/browse-classification', async (req: Request, res: Response) => {
    try {
      const { asin } = req.params;
      const { marketplaceIds, includedData, locale } = req.query;

      const response = await axios.get(`https://sellingpartnerapi-na.amazon.com/catalog/2022-04-01/items/${asin}`, {
        params: {
          marketplaceIds,
          includedData,
          locale,
        },
        headers: {
          'Accept': 'application/json',
          // Certifique-se de ajustar os cabeçalhos de autorização conforme necessário
        },
      });

      // Extrair e retornar apenas a classificação de navegação do item
      const itemBrowseClassification = response.data.browseClassification;
      res.json(itemBrowseClassification);
    } catch (error) {
      console.error(error);
      res.status(error.response?.status || 500).json({
        code: 'InternalServerError',
        message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
      });
    }
  });
  // Rota para pesquisar itens no catálogo da Amazon
  routes.get('/v1/amazon/catalog/items', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get(`${BASE_URL}/catalog/2022-04-01/items`, {
            params: request.query,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao pesquisar itens no catálogo da Amazon");
    }
});

// Rota para obter detalhes de um item no catálogo da Amazon
routes.get('/v1/amazon/catalog/items/:asin', async (request: Request, response: Response) => {
    try {
        const { asin } = request.params;
        const apiResponse = await axios.get(`${BASE_URL}/catalog/2022-04-01/items/${asin}`, {
            params: request.query,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter detalhes do item no catálogo da Amazon");
    }
});
routes.post('/easyShip/2022-03-23/timeSlot', async (request: Request, response: Response) => {
    try {
        // Extract necessary data from the request body
        const requestData = request.body;

        // Call the Amazon API to list handover slots
        const listHandoverSlotsResponse = await axios.post(`${BASE_URL}/timeSlot/listHandoverSlots`, requestData, {
            headers: {
                'Accept': 'application/json',
                // Add any necessary authorization headers
            },
        });

        response.json(listHandoverSlotsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Route to get scheduled package information
routes.get('/easyShip/2022-03-23/package/:amazonOrderId', async (request: Request, response: Response) => {
    try {
        const { amazonOrderId } = request.params;

        // Call the Amazon API to get scheduled package information
        const getScheduledPackageResponse = await axios.get(`${BASE_URL}/package/getScheduledPackage`, {
            params: {
                amazonOrderId,
                // Add any other necessary parameters
            },
            headers: {
                'Accept': 'application/json',
                // Add any necessary authorization headers
            },
        });

        response.json(getScheduledPackageResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Route to create a scheduled package
routes.post('/easyShip/2022-03-23/package', async (request: Request, response: Response) => {
    try {
        // Extract necessary data from the request body
        const requestData = request.body;

        // Call the Amazon API to create a scheduled package
        const createScheduledPackageResponse = await axios.post(`${BASE_URL}/package/createScheduledPackage`, requestData, {
            headers: {
                'Accept': 'application/json',
                // Add any necessary authorization headers
            },
        });

        response.json(createScheduledPackageResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
// Rota para atualizar pacotes agendados
routes.patch('/easyShip/2022-03-23/package', async (request: Request, response: Response) => {
    try {
        // Extrair dados necessários do corpo da solicitação
        const requestData = request.body;

        // Chamar a API da Amazon para atualizar pacotes agendados
        const updateScheduledPackagesResponse = await axios.patch(`${BASE_URL}/package/updateScheduledPackages`, requestData, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(updateScheduledPackagesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar pacotes agendados em massa
routes.post('/easyShip/2022-03-23/packages/bulk', async (request: Request, response: Response) => {
    try {
        // Extrair dados necessários do corpo da solicitação
        const requestData = request.body;

        // Chamar a API da Amazon para criar pacotes agendados em massa
        const createScheduledPackageBulkResponse = await axios.post(`${BASE_URL}/packages/bulk/createScheduledPackageBulk`, requestData, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(createScheduledPackageBulkResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rotas para getItemEligibilityPreview
routes.get('/fba/inbound/v1/eligibility/itemPreview', async (request: Request, response: Response) => {
    try {
        const { marketplaceIds, asin, program } = request.query;

        // Chamar a API da Amazon para obter uma prévia de elegibilidade
        const getItemEligibilityPreviewResponse = await axios.get('https://sellingpartnerapi-na.amazon.com/fba/inbound/v1/eligibility/itemPreview', {
            params: {
                marketplaceIds,
                asin,
                program,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getItemEligibilityPreviewResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter resumos de inventário
routes.get('/fba/inventory/v1/summaries', async (request: Request, response: Response) => {
    try {
        const { details, granularityType, granularityId, startDateTime, sellerSkus, sellerSku, nextToken, marketplaceIds } = request.query;

        // Chamar a API da Amazon para obter resumos de inventário
        const getInventorySummariesResponse = await axios.get(`${BASE_URL}/fba/inventory/v1/summaries`, {
            params: {
                details,
                granularityType,
                granularityId,
                startDateTime,
                sellerSkus,
                sellerSku,
                nextToken,
                marketplaceIds,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getInventorySummariesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter inscrição Small and Light por seller SKU
routes.get('/fba/smallAndLight/v1/enrollments/:sellerSKU', async (request: Request, response: Response) => {
    try {
        const { sellerSKU, marketplaceIds } = request.params;

        // Chamar a API da Amazon para obter a inscrição Small and Light
        const getSmallAndLightEnrollmentResponse = await axios.get(`${BASE_URL}/fba/smallAndLight/v1/enrollments/${sellerSKU}`, {
            params: {
                marketplaceIds,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getSmallAndLightEnrollmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para inscrever um item no programa Small and Light
routes.put('/fba/smallAndLight/v1/enrollments/:sellerSKU', async (request: Request, response: Response) => {
    try {
        const { sellerSKU } = request.params;
        const { marketplaceIds } = request.query;

        // Chamar a API da Amazon para inscrever um item no programa Small and Light
        const putSmallAndLightEnrollmentResponse = await axios.put(`${BASE_URL}/fba/smallAndLight/v1/enrollments/${sellerSKU}`, {}, {
            params: {
                marketplaceIds,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(putSmallAndLightEnrollmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para remover um item do programa Small and Light
routes.delete('/fba/smallAndLight/v1/enrollments/:sellerSKU', async (request: Request, response: Response) => {
    try {
        const { sellerSKU } = request.params;
        const { marketplaceIds } = request.query;

        // Chamar a API da Amazon para remover um item do programa Small and Light
        const deleteSmallAndLightEnrollmentResponse = await axios.delete(`${BASE_URL}/fba/smallAndLight/v1/enrollments/${sellerSKU}`, {
            params: {
                marketplaceIds,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(deleteSmallAndLightEnrollmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter elegibilidade Small and Light por seller SKU
routes.get('/fba/smallAndLight/v1/eligibilities/:sellerSKU', async (request: Request, response: Response) => {
    try {
        const { sellerSKU, marketplaceIds } = request.params;

        // Chamar a API da Amazon para obter a elegibilidade Small and Light
        const getSmallAndLightEligibilityResponse = await axios.get(`${BASE_URL}/fba/smallAndLight/v1/eligibilities/${sellerSKU}`, {
            params: {
                marketplaceIds,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getSmallAndLightEligibilityResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter prévia de taxa Small and Light
routes.post('/fba/smallAndLight/v1/feePreviews', async (request: Request, response: Response) => {
    try {
        const requestData = request.body;

        // Chamar a API da Amazon para obter prévia de taxa Small and Light
        const getSmallAndLightFeePreviewResponse = await axios.post(`${BASE_URL}/fba/smallAndLight/v1/feePreviews`, requestData, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getSmallAndLightFeePreviewResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter detalhes de feeds
routes.get('/feeds/2021-06-30/feeds', async (request: Request, response: Response) => {
    try {
        const { feedTypes, marketplaceIds, pageSize, processingStatuses, createdSince, createdUntil, nextToken } = request.query;

        // Chamar a API da Amazon para obter detalhes de feeds
        const getFeedsResponse = await axios.get(`${BASE_URL}/feeds/2021-06-30/feeds`, {
            params: {
                feedTypes,
                marketplaceIds,
                pageSize,
                processingStatuses,
                createdSince,
                createdUntil,
                nextToken,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getFeedsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um feed
routes.post('/feeds/2021-06-30/feeds', async (request: Request, response: Response) => {
    try {
        const requestData = request.body;

        // Chamar a API da Amazon para criar um feed
        const createFeedResponse = await axios.post(`${BASE_URL}/feeds/2021-06-30/feeds`, requestData, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(createFeedResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter detalhes de um feed
routes.get('/feeds/2021-06-30/feeds/:feedId', async (request: Request, response: Response) => {
    try {
        const { feedId } = request.params;

        // Chamar a API da Amazon para obter detalhes de um feed
        const getFeedResponse = await axios.get(`${BASE_URL}/feeds/2021-06-30/feeds/${feedId}`, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getFeedResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para cancelar um feed
routes.delete('/feeds/2021-06-30/feeds/:feedId', async (request: Request, response: Response) => {
    try {
        const { feedId } = request.params;

        // Chamar a API da Amazon para cancelar um feed
        const cancelFeedResponse = await axios.delete(`${BASE_URL}/feeds/2021-06-30/feeds/${feedId}`, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(cancelFeedResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um documento de feed
routes.post('/feeds/2021-06-30/documents', async (request: Request, response: Response) => {
    try {
        const requestData = request.body;

        // Chamar a API da Amazon para criar um documento de feed
        const createFeedDocumentResponse = await axios.post(`${BASE_URL}/feeds/2021-06-30/documents`, requestData, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(createFeedDocumentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter detalhes de um documento de feed
routes.get('/feeds/2021-06-30/documents/:feedDocumentId', async (request: Request, response: Response) => {
    try {
        const { feedDocumentId } = request.params;

        // Chamar a API da Amazon para obter detalhes de um documento de feed
        const getFeedDocumentResponse = await axios.get(`${BASE_URL}/feeds/2021-06-30/documents/${feedDocumentId}`, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getFeedDocumentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para listar grupos de eventos financeiros
routes.get('/finances/v0/financialEventGroups', async (request: Request, response: Response) => {
    try {
        const { MaxResultsPerPage, FinancialEventGroupStartedBefore, FinancialEventGroupStartedAfter, NextToken } = request.query;

        // Chamar a API da Amazon para listar grupos de eventos financeiros
        const listFinancialEventGroupsResponse = await axios.get(`${BASE_URL}/finances/v0/financialEventGroups`, {
            params: {
                MaxResultsPerPage,
                FinancialEventGroupStartedBefore,
                FinancialEventGroupStartedAfter,
                NextToken,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(listFinancialEventGroupsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para listar eventos financeiros por grupo
routes.get('/finances/v0/financialEventGroups/:eventGroupId/financialEvents', async (request: Request, response: Response) => {
    try {
        const { MaxResultsPerPage, PostedAfter, PostedBefore, eventGroupId, NextToken } = request.query;

        // Chamar a API da Amazon para listar eventos financeiros por grupo
        const listFinancialEventsByGroupIdResponse = await axios.get(`${BASE_URL}/finances/v0/financialEventGroups/${eventGroupId}/financialEvents`, {
            params: {
                MaxResultsPerPage,
                PostedAfter,
                PostedBefore,
                NextToken,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(listFinancialEventsByGroupIdResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para listar eventos financeiros por pedido
routes.get('/finances/v0/orders/:orderId/financialEvents', async (request: Request, response: Response) => {
    try {
        const { MaxResultsPerPage, NextToken } = request.query;
        const { orderId } = request.params;

        // Chamar a API da Amazon para listar eventos financeiros por pedido
        const listFinancialEventsByOrderIdResponse = await axios.get(`${BASE_URL}/finances/v0/orders/${orderId}/financialEvents`, {
            params: {
                MaxResultsPerPage,
                NextToken,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(listFinancialEventsByOrderIdResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para listar eventos financeiros
routes.get('/finances/v0/financialEvents', async (request: Request, response: Response) => {
    try {
        const { MaxResultsPerPage, PostedAfter, PostedBefore, NextToken } = request.query;

        // Chamar a API da Amazon para listar eventos financeiros
        const listFinancialEventsResponse = await axios.get(`${BASE_URL}/finances/v0/financialEvents`, {
            params: {
                MaxResultsPerPage,
                PostedAfter,
                PostedBefore,
                NextToken,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(listFinancialEventsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter orientações de itens
routes.get('/fba/inbound/v0/itemsGuidance', async (request: Request, response: Response) => {
    try {
        const { MarketplaceId, SellerSKUList, ASINList } = request.query;

        // Chamar a API da Amazon para obter orientações de itens
        const getInboundGuidanceResponse = await axios.get(`${BASE_URL}/fba/inbound/v0/itemsGuidance`, {
            params: {
                MarketplaceId,
                SellerSKUList,
                ASINList,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getInboundGuidanceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um plano de remessa de entrada
routes.post('/fba/inbound/v0/plans', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;

        // Chamar a API da Amazon para criar um plano de remessa de entrada
        const createInboundShipmentPlanResponse = await axios.post(`${BASE_URL}/fba/inbound/v0/plans`, requestBody, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(createInboundShipmentPlanResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar uma remessa de entrada
routes.put('/fba/inbound/v0/shipments/:shipmentId', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;
        const requestBody = request.body;

        // Chamar a API da Amazon para atualizar uma remessa de entrada
        const updateInboundShipmentResponse = await axios.put(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}`, requestBody, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(updateInboundShipmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar uma remessa de entrada
routes.post('/fba/inbound/v0/shipments/:shipmentId', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;
        const requestBody = request.body;

        // Chamar a API da Amazon para criar uma remessa de entrada
        const createInboundShipmentResponse = await axios.post(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}`, requestBody, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(createInboundShipmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter informações de pré-encomenda
routes.get('/fba/inbound/v0/shipments/:shipmentId/preorder', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;
        const { MarketplaceId } = request.query;

        // Chamar a API da Amazon para obter informações de pré-encomenda
        const getPreorderInfoResponse = await axios.get(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/preorder`, {
            params: {
                MarketplaceId,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getPreorderInfoResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para confirmar pré-encomenda
routes.put('/fba/inbound/v0/shipments/:shipmentId/preorder/confirm', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;
        const { NeedByDate, MarketplaceId } = request.query;

        // Chamar a API da Amazon para confirmar pré-encomenda
        const confirmPreorderResponse = await axios.put(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/preorder/confirm`, null, {
            params: {
                NeedByDate,
                MarketplaceId,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(confirmPreorderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter instruções de preparo
routes.get('/fba/inbound/v0/prepInstructions', async (request: Request, response: Response) => {
    try {
        const { ShipToCountryCode, SellerSKUList, ASINList } = request.query;

        // Chamar a API da Amazon para obter instruções de preparo
        const getPrepInstructionsResponse = await axios.get(`${BASE_URL}/fba/inbound/v0/prepInstructions`, {
            params: {
                ShipToCountryCode,
                SellerSKUList,
                ASINList,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getPrepInstructionsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter detalhes de transporte
routes.get('/fba/inbound/v0/shipments/:shipmentId/transport', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;

        // Chamar a API da Amazon para obter detalhes de transporte
        const getTransportDetailsResponse = await axios.get(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/transport`, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getTransportDetailsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para enviar detalhes de transporte
routes.put('/fba/inbound/v0/shipments/:shipmentId/transport', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;
        const requestBody = request.body;

        // Chamar a API da Amazon para enviar detalhes de transporte
        const putTransportDetailsResponse = await axios.put(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/transport`, requestBody, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(putTransportDetailsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para cancelar transporte
routes.post('/fba/inbound/v0/shipments/:shipmentId/transport/void', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;

        // Chamar a API da Amazon para cancelar transporte
        const voidTransportResponse = await axios.post(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/transport/void`, null, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(voidTransportResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para estimar o transporte
routes.post('/fba/inbound/v0/shipments/:shipmentId/transport/estimate', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;

        // Chamar a API da Amazon para estimar o transporte
        const estimateTransportResponse = await axios.post(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/transport/estimate`, null, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(estimateTransportResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para confirmar o transporte
routes.post('/fba/inbound/v0/shipments/:shipmentId/transport/confirm', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;

        // Chamar a API da Amazon para confirmar o transporte
        const confirmTransportResponse = await axios.post(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/transport/confirm`, null, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(confirmTransportResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter rótulos
routes.get('/fba/inbound/v0/shipments/:shipmentId/labels', async (request: Request, response: Response) => {
    try {
        const { shipmentId, PageType, LabelType, NumberOfPackages, PackageLabelsToPrint, NumberOfPallets, PageSize, PageStartIndex } = request.query;

        // Chamar a API da Amazon para obter rótulos
        const getLabelsResponse = await axios.get(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/labels`, {
            params: {
                PageType,
                LabelType,
                NumberOfPackages,
                PackageLabelsToPrint,
                NumberOfPallets,
                PageSize,
                PageStartIndex,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getLabelsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter conhecimento de embarque
routes.get('/fba/inbound/v0/shipments/:shipmentId/billOfLading', async (request: Request, response: Response) => {
    try {
        const { shipmentId } = request.params;

        // Chamar a API da Amazon para obter conhecimento de embarque
        const getBillOfLadingResponse = await axios.get(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/billOfLading`, {
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getBillOfLadingResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter remessas
routes.get('/fba/inbound/v0/shipments', async (request: Request, response: Response) => {
    try {
        const { ShipmentStatusList, ShipmentIdList, LastUpdatedAfter, LastUpdatedBefore, QueryType, NextToken, MarketplaceId } = request.query;

        // Chamar a API da Amazon para obter remessas
        const getShipmentsResponse = await axios.get(`${BASE_URL}/fba/inbound/v0/shipments`, {
            params: {
                ShipmentStatusList,
                ShipmentIdList,
                LastUpdatedAfter,
                LastUpdatedBefore,
                QueryType,
                NextToken,
                MarketplaceId,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getShipmentsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter itens da remessa por ID da remessa
routes.get('/fba/inbound/v0/shipments/:shipmentId/items', async (request: Request, response: Response) => {
    try {
        const { shipmentId, MarketplaceId } = request.params;

        // Chamar a API da Amazon para obter itens da remessa por ID da remessa
        const getShipmentItemsByShipmentIdResponse = await axios.get(`${BASE_URL}/fba/inbound/v0/shipments/${shipmentId}/items`, {
            params: {
                MarketplaceId,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getShipmentItemsByShipmentIdResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter itens da remessa
routes.get('/fba/inbound/v0/shipmentItems', async (request: Request, response: Response) => {
    try {
        const { LastUpdatedAfter, LastUpdatedBefore, QueryType, NextToken, MarketplaceId } = request.query;

        // Chamar a API da Amazon para obter itens da remessa
        const getShipmentItemsResponse = await axios.get(`${BASE_URL}/fba/inbound/v0/shipmentItems`, {
            params: {
                LastUpdatedAfter,
                LastUpdatedBefore,
                QueryType,
                NextToken,
                MarketplaceId,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getShipmentItemsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter detalhes sobre um item de listagem
routes.get('/listings/2021-08-01/items/:sellerId/:sku', async (request: Request, response: Response) => {
    try {
        const { sellerId, sku, marketplaceIds, issueLocale, includedData } = request.query;

        // Chamar a API da Amazon para obter detalhes sobre um item de listagem
        const getListingsItemResponse = await axios.get(`${BASE_URL}/listings/2021-08-01/items/${sellerId}/${sku}`, {
            params: {
                marketplaceIds,
                issueLocale,
                includedData,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getListingsItemResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar ou atualizar totalmente um item de listagem
routes.put('/listings/2021-08-01/items/:sellerId/:sku', async (request: Request, response: Response) => {
    try {
        const { sellerId, sku, marketplaceIds, issueLocale } = request.query;
        const { body } = request;

        // Chamar a API da Amazon para criar ou atualizar totalmente um item de listagem
        const putListingsItemResponse = await axios.put(`${BASE_URL}/listings/2021-08-01/items/${sellerId}/${sku}`, body, {
            params: {
                marketplaceIds,
                issueLocale,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(putListingsItemResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para excluir um item de listagem
routes.delete('/listings/2021-08-01/items/:sellerId/:sku', async (request: Request, response: Response) => {
    try {
        const { sellerId, sku, marketplaceIds, issueLocale } = request.query;

        // Chamar a API da Amazon para excluir um item de listagem
        const deleteListingsItemResponse = await axios.delete(`${BASE_URL}/listings/2021-08-01/items/${sellerId}/${sku}`, {
            params: {
                marketplaceIds,
                issueLocale,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(deleteListingsItemResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar parcialmente um item de listagem
routes.patch('/listings/2021-08-01/items/:sellerId/:sku', async (request: Request, response: Response) => {
    try {
        const { sellerId, sku, marketplaceIds, issueLocale } = request.query;
        const { body } = request;

        // Chamar a API da Amazon para atualizar parcialmente um item de listagem
        const patchListingsItemResponse = await axios.patch(`${BASE_URL}/listings/2021-08-01/items/${sellerId}/${sku}`, body, {
            params: {
                marketplaceIds,
                issueLocale,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(patchListingsItemResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para criar ou atualizar totalmente um item de listagem
routes.put('/listings/2020-09-01/items/:sellerId/:sku', async (request: Request, response: Response) => {
    try {
        const { sellerId, sku, marketplaceIds, issueLocale, body } = request;

        // Chamar a API da Amazon para criar ou atualizar totalmente um item de listagem
        const putListingsItemResponse = await axios.put(`${BASE_URL}/listings/2020-09-01/items/${sellerId}/${sku}`, body, {
            params: {
                marketplaceIds,
                issueLocale,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(putListingsItemResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para excluir um item de listagem
routes.delete('/listings/2020-09-01/items/:sellerId/:sku', async (request: Request, response: Response) => {
    try {
        const { sellerId, sku, marketplaceIds, issueLocale } = request.query;

        // Chamar a API da Amazon para excluir um item de listagem
        const deleteListingsItemResponse = await axios.delete(`${BASE_URL}/listings/2020-09-01/items/${sellerId}/${sku}`, {
            params: {
                marketplaceIds,
                issueLocale,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(deleteListingsItemResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar parcialmente um item de listagem
routes.patch('/listings/2020-09-01/items/:sellerId/:sku', async (request: Request, response: Response) => {
    try {
        const { sellerId, sku, marketplaceIds, issueLocale, body } = request;

        // Chamar a API da Amazon para atualizar parcialmente um item de listagem
        const patchListingsItemResponse = await axios.patch(`${BASE_URL}/listings/2020-09-01/items/${sellerId}/${sku}`, body, {
            params: {
                marketplaceIds,
                issueLocale,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(patchListingsItemResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter restrições de listagem
routes.get('/listings/2021-08-01/restrictions', async (request: Request, response: Response) => {
    try {
        const { asin, conditionType, sellerId, marketplaceIds, reasonLocale } = request.query;

        // Chamar a API da Amazon para obter restrições de listagem
        const getListingsRestrictionsResponse = await axios.get(`${BASE_URL}/listings/2021-08-01/restrictions`, {
            params: {
                asin,
                conditionType,
                sellerId,
                marketplaceIds,
                reasonLocale,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getListingsRestrictionsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para pesquisar tipos de produto
routes.get('/definitions/2020-09-01/productTypes', async (request: Request, response: Response) => {
    try {
        const { keywords, marketplaceIds, itemName, locale, searchLocale } = request.query;

        // Chamar a API da Amazon para pesquisar tipos de produto
        const searchDefinitionsProductTypesResponse = await axios.get(`${BASE_URL}/definitions/2020-09-01/productTypes`, {
            params: {
                keywords,
                marketplaceIds,
                itemName,
                locale,
                searchLocale,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(searchDefinitionsProductTypesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter definição de um tipo de produto
routes.get('/definitions/2020-09-01/productTypes/:productType', async (request: Request, response: Response) => {
    try {
        const { productType, sellerId, marketplaceIds, productTypeVersion, requirements, requirementsEnforced, locale } = request.query;

        // Chamar a API da Amazon para obter definição de um tipo de produto
        const getDefinitionsProductTypeResponse = await axios.get(`${BASE_URL}/definitions/2020-09-01/productTypes/${productType}`, {
            params: {
                sellerId,
                marketplaceIds,
                productTypeVersion,
                requirements,
                requirementsEnforced,
                locale,
            },
            headers: {
                'Accept': 'application/json',
                // Adicionar quaisquer cabeçalhos de autorização necessários
            },
        });

        response.json(getDefinitionsProductTypeResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter serviços elegíveis (deprecated)
    routes.post('/mfn/v0/eligibleServices', async (request: Request, response: Response) => {
        response.status(400).json({
            code: 'DeprecatedOperation',
            message: 'This operation is deprecated.',
        });
    });

    // Rota para obter serviços de remessa elegíveis
    routes.post('/mfn/v0/eligibleShippingServices', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para obter serviços de remessa elegíveis
            const getEligibleShipmentServicesResponse = await axios.post(`${BASE_URL}/mfn/v0/eligibleShippingServices`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getEligibleShipmentServicesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter informações de remessa
    routes.get('/mfn/v0/shipments/:shipmentId', async (request: Request, response: Response) => {
        try {
            const { shipmentId } = request.params;

            // Chamar a API da Amazon para obter informações de remessa
            const getShipmentResponse = await axios.get(`${BASE_URL}/mfn/v0/shipments/${shipmentId}`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getShipmentResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para cancelar remessa
    routes.delete('/mfn/v0/shipments/:shipmentId', async (request: Request, response: Response) => {
        try {
            const { shipmentId } = request.params;

            // Chamar a API da Amazon para cancelar remessa
            const cancelShipmentResponse = await axios.delete(`${BASE_URL}/mfn/v0/shipments/${shipmentId}`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(cancelShipmentResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para cancelar remessa (deprecated)
    routes.put('/mfn/v0/shipments/:shipmentId/cancel', async (request: Request, response: Response) => {
        response.status(400).json({
            code: 'DeprecatedOperation',
            message: 'This operation is deprecated.',
        });
    });

    // Rota para criar remessa
    routes.post('/mfn/v0/shipments', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para criar remessa
            const createShipmentResponse = await axios.post(`${BASE_URL}/mfn/v0/shipments`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createShipmentResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter entradas adicionais do vendedor (deprecated)
    routes.post('/mfn/v0/sellerInputs', async (request: Request, response: Response) => {
        response.status(400).json({
            code: 'DeprecatedOperation',
            message: 'This operation is deprecated.',
        });
    });

    // Rota para obter entradas adicionais do vendedor
    routes.post('/mfn/v0/additionalSellerInputs', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para obter entradas adicionais do vendedor
            const getAdditionalSellerInputsResponse = await axios.post(`${BASE_URL}/mfn/v0/additionalSellerInputs`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getAdditionalSellerInputsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Rota para obter ações de mensagens para um pedido
    routes.get('/messaging/v1/orders/:amazonOrderId', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;

            // Chamar a API da Amazon para obter ações de mensagens para um pedido
            const getMessagingActionsResponse = await axios.get(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}`, {
                headers: {
                    'Accept': 'application/hal+json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getMessagingActionsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para confirmar detalhes de personalização
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/confirmCustomizationDetails', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para confirmar detalhes de personalização
            const confirmCustomizationDetailsResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/confirmCustomizationDetails`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(confirmCustomizationDetailsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para confirmar detalhes de entrega
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/confirmDeliveryDetails', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para confirmar detalhes de entrega
            const confirmDeliveryDetailsResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/confirmDeliveryDetails`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(confirmDeliveryDetailsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para divulgação legal
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/legalDisclosure', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para divulgação legal
            const createLegalDisclosureResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/legalDisclosure`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createLegalDisclosureResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para remoção de feedback negativo
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/negativeFeedbackRemoval', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para remoção de feedback negativo
            const createNegativeFeedbackRemovalResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/negativeFeedbackRemoval`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createNegativeFeedbackRemovalResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para confirmar detalhes do pedido
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/confirmOrderDetails', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para confirmar detalhes do pedido
            const createConfirmOrderDetailsResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/confirmOrderDetails`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createConfirmOrderDetailsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para confirmar detalhes do serviço
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/confirmServiceDetails', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para confirmar detalhes do serviço
            const createConfirmServiceDetailsResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/confirmServiceDetails`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createConfirmServiceDetailsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para criar mensagem para Amazon Motors
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/amazonMotors', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para criar mensagem para Amazon Motors
            const createAmazonMotorsResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/amazonMotors`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createAmazonMotorsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Rota para criar mensagem de garantia
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/warranty', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para criar mensagem de garantia
            const createWarrantyResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/warranty`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createWarrantyResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter atributos relacionados a um pedido
    routes.get('/messaging/v1/orders/:amazonOrderId/attributes', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;

            // Chamar a API da Amazon para obter atributos relacionados a um pedido
            const getAttributesResponse = await axios.get(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/attributes`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getAttributesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para criar mensagem de chave de acesso digital
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/digitalAccessKey', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para criar mensagem de chave de acesso digital
            const createDigitalAccessKeyResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/digitalAccessKey`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createDigitalAccessKeyResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para criar mensagem de problema inesperado
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/unexpectedProblem', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para criar mensagem de problema inesperado
            const createUnexpectedProblemResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/unexpectedProblem`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createUnexpectedProblemResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para enviar fatura
    routes.post('/messaging/v1/orders/:amazonOrderId/messages/invoice', async (request: Request, response: Response) => {
        try {
            const { amazonOrderId } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para enviar fatura
            const sendInvoiceResponse = await axios.post(`${BASE_URL}/messaging/v1/orders/${amazonOrderId}/messages/invoice`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(sendInvoiceResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
};

export const setNotificationsRoutes = (routes: Router) => {
    // Rota para obter informações sobre inscrições de um tipo de notificação
    routes.get('/notifications/v1/subscriptions/:notificationType', async (request: Request, response: Response) => {
        try {
            const { notificationType } = request.params;

            // Chamar a API da Amazon para obter informações sobre inscrições de um tipo de notificação
            const getSubscriptionResponse = await axios.get(`${BASE_URL}/notifications/v1/subscriptions/${notificationType}`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getSubscriptionResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para criar inscrição para um tipo de notificação
    routes.post('/notifications/v1/subscriptions/:notificationType', async (request: Request, response: Response) => {
        try {
            const { notificationType } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para criar inscrição para um tipo de notificação
            const createSubscriptionResponse = await axios.post(`${BASE_URL}/notifications/v1/subscriptions/${notificationType}`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createSubscriptionResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter informações sobre uma inscrição por ID
    routes.get('/notifications/v1/subscriptions/:notificationType/:subscriptionId', async (request: Request, response: Response) => {
        try {
            const { subscriptionId, notificationType } = request.params;

            // Chamar a API da Amazon para obter informações sobre uma inscrição por ID
            const getSubscriptionByIdResponse = await axios.get(`${BASE_URL}/notifications/v1/subscriptions/${notificationType}/${subscriptionId}`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getSubscriptionByIdResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para excluir uma inscrição por ID
    routes.delete('/notifications/v1/subscriptions/:notificationType/:subscriptionId', async (request: Request, response: Response) => {
        try {
            const { subscriptionId, notificationType } = request.params;

            // Chamar a API da Amazon para excluir uma inscrição por ID
            const deleteSubscriptionByIdResponse = await axios.delete(`${BASE_URL}/notifications/v1/subscriptions/${notificationType}/${subscriptionId}`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(deleteSubscriptionByIdResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter informações sobre todos os destinos
    routes.get('/notifications/v1/destinations', async (request: Request, response: Response) => {
        try {
            // Chamar a API da Amazon para obter informações sobre todos os destinos
            const getDestinationsResponse = await axios.get(`${BASE_URL}/notifications/v1/destinations`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getDestinationsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para criar um novo destino
    routes.post('/notifications/v1/destinations', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para criar um novo destino
            const createDestinationResponse = await axios.post(`${BASE_URL}/notifications/v1/destinations`, body, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createDestinationResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter informações sobre um destino específico
    routes.get('/notifications/v1/destinations/:destinationId', async (request: Request, response: Response) => {
        try {
            const { destinationId } = request.params;

            // Chamar a API da Amazon para obter informações sobre um destino específico
            const getDestinationResponse = await axios.get(`${BASE_URL}/notifications/v1/destinations/${destinationId}`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getDestinationResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para excluir um destino por ID
    routes.delete('/notifications/v1/destinations/:destinationId', async (request: Request, response: Response) => {
        try {
            const { destinationId } = request.params;

            // Chamar a API da Amazon para excluir um destino por ID
            const deleteDestinationResponse = await axios.delete(`${BASE_URL}/notifications/v1/destinations/${destinationId}`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(deleteDestinationResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Rota para obter pedidos
    routes.get('/orders/v0/orders', async (request: Request, response: Response) => {
        try {
            const { query } = request;

            // Chamar a API da Amazon para obter pedidos
            const getOrdersResponse = await axios.get(`${BASE_URL}/orders/v0/orders`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
                params: query,
            });

            response.json(getOrdersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter um pedido específico
    routes.get('/orders/v0/orders/:orderId', async (request: Request, response: Response) => {
        try {
            const { orderId } = request.params;

            // Chamar a API da Amazon para obter um pedido específico
            const getOrderResponse = await axios.get(`${BASE_URL}/orders/v0/orders/${orderId}`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getOrderResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter informações do comprador para um pedido específico
    routes.get('/orders/v0/orders/:orderId/buyerInfo', async (request: Request, response: Response) => {
        try {
            const { orderId } = request.params;

            // Chamar a API da Amazon para obter informações do comprador
            const getBuyerInfoResponse = await axios.get(`${BASE_URL}/orders/v0/orders/${orderId}/buyerInfo`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getBuyerInfoResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter o endereço de envio para um pedido específico
    routes.get('/orders/v0/orders/:orderId/address', async (request: Request, response: Response) => {
        try {
            const { orderId } = request.params;

            // Chamar a API da Amazon para obter o endereço de envio
            const getAddressResponse = await axios.get(`${BASE_URL}/orders/v0/orders/${orderId}/address`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getAddressResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Rota para obter itens detalhados do pedido
    routes.get('/orders/v0/orders/:orderId/orderItems', async (request: Request, response: Response) => {
        try {
            const { orderId } = request.params;
            const { NextToken } = request.query;

            // Chamar a API da Amazon para obter itens detalhados do pedido
            const getOrderItemsResponse = await axios.get(`${BASE_URL}/orders/v0/orders/${orderId}/orderItems`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
                params: {
                    NextToken,
                },
            });

            response.json(getOrderItemsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter informações do comprador para os itens do pedido
    routes.get('/orders/v0/orders/:orderId/orderItems/buyerInfo', async (request: Request, response: Response) => {
        try {
            const { orderId } = request.params;
            const { NextToken } = request.query;

            // Chamar a API da Amazon para obter informações do comprador para os itens do pedido
            const getOrderItemsBuyerInfoResponse = await axios.get(`${BASE_URL}/orders/v0/orders/${orderId}/orderItems/buyerInfo`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
                params: {
                    NextToken,
                },
            });

            response.json(getOrderItemsBuyerInfoResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para atualizar o status de remessa para um pedido
    routes.post('/orders/v0/orders/:orderId/shipment', async (request: Request, response: Response) => {
        try {
            const { orderId } = request.params;
            const { payload } = request.body;

            // Chamar a API da Amazon para atualizar o status de remessa
            const updateShipmentStatusResponse = await axios.post(`${BASE_URL}/orders/v0/orders/${orderId}/shipment`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(updateShipmentStatusResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter informações regulamentadas para um pedido
    routes.get('/orders/v0/orders/:orderId/regulatedInfo', async (request: Request, response: Response) => {
        try {
            const { orderId } = request.params;

            // Chamar a API da Amazon para obter informações regulamentadas
            const getOrderRegulatedInfoResponse = await axios.get(`${BASE_URL}/orders/v0/orders/${orderId}/regulatedInfo`, {
                headers: {
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getOrderRegulatedInfoResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para atualizar o status de verificação para um pedido
    routes.patch('/orders/v0/orders/:orderId/regulatedInfo', async (request: Request, response: Response) => {
        try {
            const { orderId } = request.params;
            const { payload } = request.body;

            // Chamar a API da Amazon para atualizar o status de verificação
            const updateVerificationStatusResponse = await axios.patch(`${BASE_URL}/orders/v0/orders/${orderId}/regulatedInfo`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(updateVerificationStatusResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para confirmar o status de remessa para um pedido
    routes.post('/orders/v0/orders/:orderId/shipmentConfirmation', async (request: Request, response: Response) => {
        try {
            const { orderId } = request.params;
            const { payload } = request.body;

            // Chamar a API da Amazon para confirmar o status de remessa
            const confirmShipmentResponse = await axios.post(`${BASE_URL}/orders/v0/orders/${orderId}/shipmentConfirmation`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(confirmShipmentResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter estimativas de taxas para um SKU
    routes.post('/products/fees/v0/listings/:SellerSKU/feesEstimate', async (request: Request, response: Response) => {
        try {
            const { SellerSKU } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para obter estimativas de taxas para um SKU
            const getFeesEstimateForSKUResponse = await axios.post(`${BASE_URL}/products/fees/v0/listings/${SellerSKU}/feesEstimate`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getFeesEstimateForSKUResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter estimativas de taxas para um ASIN
    routes.post('/products/fees/v0/items/:Asin/feesEstimate', async (request: Request, response: Response) => {
        try {
            const { Asin } = request.params;
            const { body } = request;

            // Chamar a API da Amazon para obter estimativas de taxas para um ASIN
            const getFeesEstimateForASINResponse = await axios.post(`${BASE_URL}/products/fees/v0/items/${Asin}/feesEstimate`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getFeesEstimateForASINResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter estimativas de taxas para uma lista de produtos
    routes.post('/products/fees/v0/feesEstimate', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para obter estimativas de taxas para uma lista de produtos
            const getFeesEstimatesResponse = await axios.post(`${BASE_URL}/products/fees/v0/feesEstimate`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getFeesEstimatesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Rota para obter o preço esperado da oferta em destaque para um lote de solicitações
    routes.post('/batches/products/pricing/2022-05-01/offer/featuredOfferExpectedPrice', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para obter o preço esperado da oferta em destaque
            const getFeaturedOfferExpectedPriceBatchResponse = await axios.post(`${BASE_URL}/batches/products/pricing/2022-05-01/offer/featuredOfferExpectedPrice`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getFeaturedOfferExpectedPriceBatchResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter o resumo competitivo para um lote de solicitações
    routes.post('/batches/products/pricing/2022-05-01/items/competitiveSummary', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para obter o resumo competitivo
            const getCompetitiveSummaryResponse = await axios.post(`${BASE_URL}/batches/products/pricing/2022-05-01/items/competitiveSummary`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getCompetitiveSummaryResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter métricas do programa de reabastecimento para um parceiro de vendas
    routes.post('/replenishment/2022-11-07/sellingPartners/metrics/search', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para obter métricas do programa de reabastecimento
            const getSellingPartnerMetricsResponse = await axios.post(`${BASE_URL}/replenishment/2022-11-07/sellingPartners/metrics/search`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getSellingPartnerMetricsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para listar métricas do programa de reabastecimento para ofertas de um parceiro de vendas
    routes.post('/replenishment/2022-11-07/offers/metrics/search', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para listar métricas do programa de reabastecimento para ofertas
            const listOfferMetricsResponse = await axios.post(`${BASE_URL}/replenishment/2022-11-07/offers/metrics/search`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(listOfferMetricsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para listar ofertas do programa de reabastecimento para um parceiro de vendas
    routes.post('/replenishment/2022-11-07/offers/search', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para listar ofertas do programa de reabastecimento
            const listOffersResponse = await axios.post(`${BASE_URL}/replenishment/2022-11-07/offers/search`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(listOffersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Rota para obter detalhes de relatórios com base nos filtros fornecidos
    routes.get('/reports/2021-06-30/reports', async (request: Request, response: Response) => {
        try {
            const { query } = request;

            // Chamar a API da Amazon para obter detalhes de relatórios
            const getReportsResponse = await axios.get(`${BASE_URL}/reports/2021-06-30/reports`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
                params: query,
            });

            response.json(getReportsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para criar um relatório
    routes.post('/reports/2021-06-30/reports', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para criar um relatório
            const createReportResponse = await axios.post(`${BASE_URL}/reports/2021-06-30/reports`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createReportResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter detalhes de um relatório específico
    routes.get('/reports/2021-06-30/reports/:reportId', async (request: Request, response: Response) => {
        try {
            const { params } = request;

            // Chamar a API da Amazon para obter detalhes de um relatório específico
            const getReportResponse = await axios.get(`${BASE_URL}/reports/2021-06-30/reports/${params.reportId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getReportResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para cancelar um relatório
    routes.delete('/reports/2021-06-30/reports/:reportId', async (request: Request, response: Response) => {
        try {
            const { params } = request;

            // Chamar a API da Amazon para cancelar um relatório
            const cancelReportResponse = await axios.delete(`${BASE_URL}/reports/2021-06-30/reports/${params.reportId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(cancelReportResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter detalhes de relatórios agendados com base nos filtros fornecidos
    routes.get('/reports/2021-06-30/schedules', async (request: Request, response: Response) => {
        try {
            const { query } = request;

            // Chamar a API da Amazon para obter detalhes de relatórios agendados
            const getReportSchedulesResponse = await axios.get(`${BASE_URL}/reports/2021-06-30/schedules`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
                params: query,
            });

            response.json(getReportSchedulesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para criar um cronograma de relatórios
    routes.post('/reports/2021-06-30/schedules', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para criar um cronograma de relatórios
            const createReportScheduleResponse = await axios.post(`${BASE_URL}/reports/2021-06-30/schedules`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(createReportScheduleResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter detalhes de um cronograma de relatórios específico
    routes.get('/reports/2021-06-30/schedules/:reportScheduleId', async (request: Request, response: Response) => {
        try {
            const { params } = request;

            // Chamar a API da Amazon para obter detalhes de um cronograma de relatórios específico
            const getReportScheduleResponse = await axios.get(`${BASE_URL}/reports/2021-06-30/schedules/${params.reportScheduleId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getReportScheduleResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para cancelar um cronograma de relatórios
    routes.delete('/reports/2021-06-30/schedules/:reportScheduleId', async (request: Request, response: Response) => {
        try {
            const { params } = request;

            // Chamar a API da Amazon para cancelar um cronograma de relatórios
            const cancelReportScheduleResponse = await axios.delete(`${BASE_URL}/reports/2021-06-30/schedules/${params.reportScheduleId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(cancelReportScheduleResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter informações para recuperar o conteúdo de um documento de relatório
    routes.get('/reports/2021-06-30/documents/:reportDocumentId', async (request: Request, response: Response) => {
        try {
            const { params } = request;

            // Chamar a API da Amazon para obter informações do documento do relatório
            const getReportDocumentResponse = await axios.get(`${BASE_URL}/reports/2021-06-30/documents/${params.reportDocumentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getReportDocumentResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
     // Rota para obter detalhes de um trabalho de serviço por ID
     routes.get('/service/v1/serviceJobs/{serviceJobId}', async (request: Request, response: Response) => {
        try {
            const { params } = request;

            // Chamar a API da Amazon para obter detalhes de um trabalho de serviço por ID
            const getServiceJobByServiceJobIdResponse = await axios.get(`${BASE_URL}/service/v1/serviceJobs/${params.serviceJobId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getServiceJobByServiceJobIdResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para cancelar um trabalho de serviço por ID
    routes.put('/service/v1/serviceJobs/{serviceJobId}/cancellations', async (request: Request, response: Response) => {
        try {
            const { params, query } = request;

            // Chamar a API da Amazon para cancelar um trabalho de serviço por ID
            const cancelServiceJobByServiceJobIdResponse = await axios.put(
                `${BASE_URL}/service/v1/serviceJobs/${params.serviceJobId}/cancellations`,
                null,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                    params: query,
                }
            );

            response.json(cancelServiceJobByServiceJobIdResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para concluir um trabalho de serviço por ID
    routes.put('/service/v1/serviceJobs/{serviceJobId}/completions', async (request: Request, response: Response) => {
        try {
            const { params } = request;

            // Chamar a API da Amazon para concluir um trabalho de serviço por ID
            const completeServiceJobByServiceJobIdResponse = await axios.put(
                `${BASE_URL}/service/v1/serviceJobs/${params.serviceJobId}/completions`,
                null,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(completeServiceJobByServiceJobIdResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter detalhes de trabalhos de serviço com base em filtros
    routes.get('/service/v1/serviceJobs', async (request: Request, response: Response) => {
        try {
            const { query } = request;

            // Chamar a API da Amazon para obter detalhes de trabalhos de serviço
            const getServiceJobsResponse = await axios.get(`${BASE_URL}/service/v1/serviceJobs`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
                params: query,
            });

            response.json(getServiceJobsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para adicionar um compromisso para um trabalho de serviço por ID
    routes.post('/service/v1/serviceJobs/{serviceJobId}/appointments', async (request: Request, response: Response) => {
        try {
            const { params, body } = request;

            // Chamar a API da Amazon para adicionar um compromisso para um trabalho de serviço por ID
            const addAppointmentForServiceJobByServiceJobIdResponse = await axios.post(
                `${BASE_URL}/service/v1/serviceJobs/${params.serviceJobId}/appointments`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(addAppointmentForServiceJobByServiceJobIdResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para remarcar um compromisso para um trabalho de serviço por ID
    routes.post('/service/v1/serviceJobs/{serviceJobId}/appointments/{appointmentId}/reschedule', async (request: Request, response: Response) => {
        try {
            const { params, body } = request;

            // Chamar a API da Amazon para remarcar um compromisso para um trabalho de serviço por ID
            const rescheduleAppointmentForServiceJobByServiceJobIdResponse = await axios.post(
                `${BASE_URL}/service/v1/serviceJobs/${params.serviceJobId}/appointments/${params.appointmentId}/reschedule`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(rescheduleAppointmentForServiceJobByServiceJobIdResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Rota para obter participações no marketplace
    routes.get('/sellers/v1/marketplaceParticipations', async (request: Request, response: Response) => {
        try {
            // Chamar a API da Amazon para obter participações no marketplace
            const getMarketplaceParticipationsResponse = await axios.get(`${BASE_URL}/sellers/v1/marketplaceParticipations`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            });

            response.json(getMarketplaceParticipationsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Rota para obter métricas de pedidos
    routes.get('/sales/v1/orderMetrics', async (request: Request, response: Response) => {
        try {
            const { query } = request;

            // Chamar a API da Amazon para obter métricas de pedidos
            const getOrderMetricsResponse = await axios.get(`${BASE_URL}/sales/v1/orderMetrics`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
                params: query,
            });

            response.json(getOrderMetricsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
// Rota para atribuir novos recursos a um compromisso de trabalho de serviço
routes.put('/service/v1/serviceJobs/{serviceJobId}/appointments/{appointmentId}/resources', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para atribuir novos recursos a um compromisso de trabalho de serviço
        const assignAppointmentResourcesResponse = await axios.put(
            `${BASE_URL}/service/v1/serviceJobs/${params.serviceJobId}/appointments/${params.appointmentId}/resources`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(assignAppointmentResourcesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar os dados de atendimento de um compromisso de trabalho de serviço
routes.put('/service/v1/serviceJobs/{serviceJobId}/appointments/{appointmentId}/fulfillment', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para atualizar os dados de atendimento de um compromisso de trabalho de serviço
        const setAppointmentFulfillmentDataResponse = await axios.put(
            `${BASE_URL}/service/v1/serviceJobs/${params.serviceJobId}/appointments/${params.appointmentId}/fulfillment`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(setAppointmentFulfillmentDataResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter capacidade de slots de intervalo
routes.post('/service/v1/serviceResources/{resourceId}/capacity/range', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para obter capacidade de slots de intervalo
        const getRangeSlotCapacityResponse = await axios.post(
            `${BASE_URL}/service/v1/serviceResources/${params.resourceId}/capacity/range`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getRangeSlotCapacityResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter capacidade de slots fixos
routes.post('/service/v1/serviceResources/{resourceId}/capacity/fixed', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para obter capacidade de slots fixos
        const getFixedSlotCapacityResponse = await axios.post(
            `${BASE_URL}/service/v1/serviceResources/${params.resourceId}/capacity/fixed`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getFixedSlotCapacityResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar o cronograma de um recurso
routes.put('/service/v1/serviceResources/{resourceId}/schedules', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para atualizar o cronograma de um recurso
        const updateScheduleResponse = await axios.put(
            `${BASE_URL}/service/v1/serviceResources/${params.resourceId}/schedules`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(updateScheduleResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar uma reserva
routes.post('/service/v1/reservation', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para criar uma reserva
        const createReservationResponse = await axios.post(
            `${BASE_URL}/service/v1/reservation`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(createReservationResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar uma reserva
routes.put('/service/v1/reservation/{reservationId}', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para atualizar uma reserva
        const updateReservationResponse = await axios.put(
            `${BASE_URL}/service/v1/reservation/${params.reservationId}`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(updateReservationResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para cancelar uma reserva
routes.delete('/service/v1/reservation/{reservationId}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para cancelar uma reserva
        const cancelReservationResponse = await axios.delete(
            `${BASE_URL}/service/v1/reservation/${params.reservationId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(cancelReservationResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter slots de compromissos por ID de trabalho de serviço
routes.get('/service/v1/serviceJobs/{serviceJobId}/appointmentSlots', async (request: Request, response: Response) => {
    try {
        const { params, query } = request;

        // Chamar a API da Amazon para obter slots de compromissos por ID de trabalho de serviço
        const getAppointmmentSlotsByJobIdResponse = await axios.get(
            `${BASE_URL}/service/v1/serviceJobs/${params.serviceJobId}/appointmentSlots`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
                params: query,
            }
        );

        response.json(getAppointmmentSlotsByJobIdResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter slots de compromissos com base no contexto do serviço
routes.get('/service/v1/appointmentSlots', async (request: Request, response: Response) => {
    try {
        const { query } = request;

        // Chamar a API da Amazon para obter slots de compromissos com base no contexto do serviço
        const getAppointmentSlotsResponse = await axios.get(
            `${BASE_URL}/service/v1/appointmentSlots`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
                params: query,
            }
        );

        response.json(getAppointmentSlotsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um destino de upload de documento
routes.post('/service/v1/documents', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para criar um destino de upload de documento
        const createServiceDocumentUploadDestinationResponse = await axios.post(
            `${BASE_URL}/service/v1/documents`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(createServiceDocumentUploadDestinationResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter detalhes do envio por ID de remessa
routes.get('/fba/outbound/brazil/v0/shipments/{shipmentId}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter detalhes do envio por ID de remessa
        const getShipmentDetailsResponse = await axios.get(
            `${BASE_URL}/fba/outbound/brazil/v0/shipments/${params.shipmentId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getShipmentDetailsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para enviar um documento de fatura para um envio específico
routes.post('/fba/outbound/brazil/v0/shipments/{shipmentId}/invoice', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para enviar um documento de fatura para um envio específico
        const submitInvoiceResponse = await axios.post(
            `${BASE_URL}/fba/outbound/brazil/v0/shipments/${params.shipmentId}/invoice`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(submitInvoiceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter o status da fatura para um envio específico
routes.get('/fba/outbound/brazil/v0/shipments/{shipmentId}/invoice/status', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter o status da fatura para um envio específico
        const getInvoiceStatusResponse = await axios.get(
            `${BASE_URL}/fba/outbound/brazil/v0/shipments/${params.shipmentId}/invoice/status`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getInvoiceStatusResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um novo envio
routes.post('/shipping/v1/shipments', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para criar um novo envio
        const createShipmentResponse = await axios.post(
            'https://sellingpartnerapi-na.amazon.com/shipping/v1/shipments',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(createShipmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter um envio por ID
routes.get('/shipping/v1/shipments/{shipmentId}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter um envio por ID
        const getShipmentResponse = await axios.get(
            `https://sellingpartnerapi-na.amazon.com/shipping/v1/shipments/${params.shipmentId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getShipmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para cancelar um envio por ID
routes.post('/shipping/v1/shipments/{shipmentId}/cancel', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para cancelar um envio por ID
        const cancelShipmentResponse = await axios.post(
            `https://sellingpartnerapi-na.amazon.com/shipping/v1/shipments/${params.shipmentId}/cancel`,
            null, // Não requer um corpo para cancelar o envio
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(cancelShipmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para comprar rótulos de envio com base em uma taxa específica
routes.post('/shipping/v1/shipments/{shipmentId}/purchaseLabels', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para comprar rótulos de envio com base em uma taxa específica
        const purchaseLabelsResponse = await axios.post(
            `https://sellingpartnerapi-na.amazon.com/shipping/v1/shipments/${params.shipmentId}/purchaseLabels`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(purchaseLabelsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para recuperar um rótulo de envio com base no ID de envio e ID de rastreamento
routes.post('/shipping/v1/shipments/{shipmentId}/containers/{trackingId}/label', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para recuperar um rótulo de envio com base no ID de envio e ID de rastreamento
        const retrieveShippingLabelResponse = await axios.post(
            `https://sellingpartnerapi-na.amazon.com/shipping/v1/shipments/${params.shipmentId}/containers/${params.trackingId}/label`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(retrieveShippingLabelResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para comprar rótulos de envio
routes.post('/shipping/v1/purchaseShipment', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para comprar rótulos de envio
        const purchaseShipmentResponse = await axios.post(
            'https://sellingpartnerapi-na.amazon.com/shipping/v1/purchaseShipment',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(purchaseShipmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter taxas de serviço
routes.post('/shipping/v1/rates', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para obter taxas de serviço
        const getRatesResponse = await axios.post(
            'https://sellingpartnerapi-na.amazon.com/shipping/v1/rates',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getRatesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para verificar se a conta atual é válida
routes.get('/shipping/v1/account', async (request: Request, response: Response) => {
    try {
        // Chamar a API da Amazon para verificar se a conta atual é válida
        const getAccountResponse = await axios.get(
            'https://sellingpartnerapi-na.amazon.com/shipping/v1/account',
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getAccountResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter informações de rastreamento de um envio
routes.get('/shipping/v1/tracking/{trackingId}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter informações de rastreamento de um envio
        const getTrackingInformationResponse = await axios.get(
            `https://sellingpartnerapi-na.amazon.com/shipping/v1/tracking/${params.trackingId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getTrackingInformationResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter ações de solicitação disponíveis para um pedido específico
routes.get('/solicitations/v1/orders/{amazonOrderId}', async (request: Request, response: Response) => {
    try {
        const { params, query } = request;

        // Chamar a API da Amazon para obter ações de solicitação disponíveis para um pedido específico
        const getSolicitationActionsForOrderResponse = await axios.get(
            `https://sellingpartnerapi-na.amazon.com/solicitations/v1/orders/${params.amazonOrderId}`,
            {
                params: {
                    marketplaceIds: query.marketplaceIds,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/hal+json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getSolicitationActionsForOrderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para enviar uma solicitação de revisão de produto e feedback do vendedor para um pedido específico
routes.post('/solicitations/v1/orders/{amazonOrderId}/solicitations/productReviewAndSellerFeedback', async (request: Request, response: Response) => {
    try {
        const { params, query } = request;

        // Chamar a API da Amazon para enviar uma solicitação de revisão de produto e feedback do vendedor
        const createProductReviewAndSellerFeedbackSolicitationResponse = await axios.post(
            `https://sellingpartnerapi-na.amazon.com/solicitations/v1/orders/${params.amazonOrderId}/solicitations/productReviewAndSellerFeedback`,
            null, // Não requer um corpo para esta solicitação
            {
                params: {
                    marketplaceIds: query.marketplaceIds,
                },
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(createProductReviewAndSellerFeedbackSolicitationResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter fontes de fornecimento paginadas
routes.get('/supplySources/2020-07-01/supplySources', async (request: Request, response: Response) => {
    try {
        const { query } = request;

        // Chamar a API da Amazon para obter fontes de fornecimento paginadas
        const getSupplySourcesResponse = await axios.get(
            'https://sellingpartnerapi-na.amazon.com/supplySources/2020-07-01/supplySources',
            {
                params: {
                    nextPageToken: query.nextPageToken,
                    pageSize: query.pageSize,
                },
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getSupplySourcesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar uma nova fonte de fornecimento
routes.post('/supplySources/2020-07-01/supplySources', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para criar uma nova fonte de fornecimento
        const createSupplySourceResponse = await axios.post(
            'https://sellingpartnerapi-na.amazon.com/supplySources/2020-07-01/supplySources',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(createSupplySourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter uma fonte de fornecimento por ID
routes.get('/supplySources/2020-07-01/supplySources/{supplySourceId}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter uma fonte de fornecimento por ID
        const getSupplySourceResponse = await axios.get(
            `https://sellingpartnerapi-na.amazon.com/supplySources/2020-07-01/supplySources/${params.supplySourceId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getSupplySourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar a configuração e capacidades de uma fonte de fornecimento
routes.put('/supplySources/2020-07-01/supplySources/{supplySourceId}', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para atualizar a configuração e capacidades de uma fonte de fornecimento
        const updateSupplySourceResponse = await axios.put(
            `https://sellingpartnerapi-na.amazon.com/supplySources/2020-07-01/supplySources/${params.supplySourceId}`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(updateSupplySourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para arquivar uma fonte de fornecimento, tornando-a inativa
routes.delete('/supplySources/2020-07-01/supplySources/{supplySourceId}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para arquivar uma fonte de fornecimento
        const archiveSupplySourceResponse = await axios.delete(
            `https://sellingpartnerapi-na.amazon.com/supplySources/2020-07-01/supplySources/${params.supplySourceId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(archiveSupplySourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar o status de uma fonte de fornecimento
routes.put('/supplySources/2020-07-01/supplySources/{supplySourceId}/status', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para atualizar o status de uma fonte de fornecimento
        const updateSupplySourceStatusResponse = await axios.put(
            `https://sellingpartnerapi-na.amazon.com/supplySources/2020-07-01/supplySources/${params.supplySourceId}/status`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(updateSupplySourceStatusResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para criar um Restricted Data Token (RDT) para recursos restritos
routes.post('/tokens/2021-03-01/restrictedDataToken', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para criar um Restricted Data Token (RDT)
        const createRestrictedDataTokenResponse = await axios.post(
            'https://sellingpartnerapi-na.amazon.com/tokens/2021-03-01/restrictedDataToken',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(createRestrictedDataTokenResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um destino de upload para um recurso específico
routes.post('/uploads/2020-11-01/uploadDestinations/{resource}', async (request: Request, response: Response) => {
    try {
        const { params, query } = request;

        // Chamar a API da Amazon para criar um destino de upload
        const createUploadDestinationForResourceResponse = await axios.post(
            `https://sellingpartnerapi-na.amazon.com/uploads/2020-11-01/uploadDestinations/${params.resource}`,
            null, // Não requer um corpo para esta solicitação
            {
                params: {
                    marketplaceIds: query.marketplaceIds,
                    contentMD5: query.contentMD5,
                    contentType: query.contentType,
                },
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(createUploadDestinationForResourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para enviar atualizações de inventário para um armazém específico
routes.post('/vendor/directFulfillment/inventory/v1/warehouses/{warehouseId}/items', async (request: Request, response: Response) => {
    try {
        const { params, body } = request;

        // Chamar a API da Amazon para enviar atualizações de inventário
        const submitInventoryUpdateResponse = await axios.post(
            `https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/inventory/v1/warehouses/${params.warehouseId}/items`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(submitInventoryUpdateResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter o status de uma transação específica
routes.get('/vendor/directFulfillment/transactions/v1/transactions/{transactionId}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter o status de uma transação
        const getTransactionStatusResponse = await axios.get(
            `https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/transactions/v1/transactions/${params.transactionId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getTransactionStatusResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter uma lista de pedidos de compra
routes.get('/vendor/directFulfillment/orders/v1/purchaseOrders', async (request: Request, response: Response) => {
    try {
        const { query } = request;

        // Chamar a API da Amazon para obter uma lista de pedidos de compra
        const getOrdersResponse = await axios.get(
            'https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/orders/v1/purchaseOrders',
            {
                params: {
                    shipFromPartyId: query.shipFromPartyId,
                    status: query.status,
                    limit: query.limit,
                    createdAfter: query.createdAfter,
                    createdBefore: query.createdBefore,
                    sortOrder: query.sortOrder,
                    nextToken: query.nextToken,
                    includeDetails: query.includeDetails,
                },
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getOrdersResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter informações de um pedido de compra específico
routes.get('/vendor/directFulfillment/orders/v1/purchaseOrders/{purchaseOrderNumber}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter informações de um pedido de compra
        const getOrderResponse = await axios.get(
            `https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/orders/v1/purchaseOrders/${params.purchaseOrderNumber}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getOrderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para enviar confirmações para um ou mais pedidos de compra
routes.post('/vendor/directFulfillment/orders/v1/acknowledgements', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para enviar confirmações de pedidos
        const submitAcknowledgementResponse = await axios.post(
            'https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/orders/v1/acknowledgements',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(submitAcknowledgementResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter uma lista de etiquetas de envio
routes.get('/vendor/directFulfillment/shipping/v1/shippingLabels', async (request: Request, response: Response) => {
    try {
        const { query } = request;

        // Chamar a API da Amazon para obter uma lista de etiquetas de envio
        const getShippingLabelsResponse = await axios.get(
            'https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/shipping/v1/shippingLabels',
            {
                params: {
                    shipFromPartyId: query.shipFromPartyId,
                    limit: query.limit,
                    createdAfter: query.createdAfter,
                    createdBefore: query.createdBefore,
                    sortOrder: query.sortOrder,
                    nextToken: query.nextToken,
                },
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getShippingLabelsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar uma etiqueta de envio
routes.post('/vendor/directFulfillment/shipping/v1/shippingLabels', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para criar uma etiqueta de envio
        const submitShippingLabelRequestResponse = await axios.post(
            'https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/shipping/v1/shippingLabels',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(submitShippingLabelRequestResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter uma etiqueta de envio específica
routes.get('/vendor/directFulfillment/shipping/v1/shippingLabels/{purchaseOrderNumber}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter uma etiqueta de envio específica
        const getShippingLabelResponse = await axios.get(
            `https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/shipping/v1/shippingLabels/${params.purchaseOrderNumber}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getShippingLabelResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para enviar confirmações de remessa
routes.post('/vendor/directFulfillment/shipping/v1/shipmentConfirmations', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para enviar confirmações de remessa
        const submitShipmentConfirmationsResponse = await axios.post(
            'https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/shipping/v1/shipmentConfirmations',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(submitShipmentConfirmationsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para enviar atualizações de status de remessa
routes.post('/vendor/directFulfillment/shipping/v1/shipmentStatusUpdates', async (request: Request, response: Response) => {
    try {
        const { body } = request;

        // Chamar a API da Amazon para enviar atualizações de status de remessa
        const submitShipmentStatusUpdatesResponse = await axios.post(
            'https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/shipping/v1/shipmentStatusUpdates',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(submitShipmentStatusUpdatesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter uma lista de faturas do cliente
routes.get('/vendor/directFulfillment/shipping/v1/customerInvoices', async (request: Request, response: Response) => {
    try {
        const { query } = request;

        // Chamar a API da Amazon para obter uma lista de faturas do cliente
        const getCustomerInvoicesResponse = await axios.get(
            'https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/shipping/v1/customerInvoices',
            {
                params: {
                    shipFromPartyId: query.shipFromPartyId,
                    limit: query.limit,
                    createdAfter: query.createdAfter,
                    createdBefore: query.createdBefore,
                    sortOrder: query.sortOrder,
                    nextToken: query.nextToken,
                },
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getCustomerInvoicesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter uma fatura do cliente específica
routes.get('/vendor/directFulfillment/shipping/v1/customerInvoices/{purchaseOrderNumber}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter uma fatura do cliente específica
        const getCustomerInvoiceResponse = await axios.get(
            `https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/shipping/v1/customerInvoices/${params.purchaseOrderNumber}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getCustomerInvoiceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter uma lista de guias de remessa
routes.get('/vendor/directFulfillment/shipping/v1/packingSlips', async (request: Request, response: Response) => {
    try {
        const { query } = request;

        // Chamar a API da Amazon para obter uma lista de guias de remessa
        const getPackingSlipsResponse = await axios.get(
            'https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/shipping/v1/packingSlips',
            {
                params: {
                    shipFromPartyId: query.shipFromPartyId,
                    limit: query.limit,
                    createdAfter: query.createdAfter,
                    createdBefore: query.createdBefore,
                    sortOrder: query.sortOrder,
                    nextToken: query.nextToken,
                },
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getPackingSlipsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter uma guia de remessa específica
routes.get('/vendor/directFulfillment/shipping/v1/packingSlips/{purchaseOrderNumber}', async (request: Request, response: Response) => {
    try {
        const { params } = request;

        // Chamar a API da Amazon para obter uma guia de remessa específica
        const getPackingSlipResponse = await axios.get(
            `https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/shipping/v1/packingSlips/${params.purchaseOrderNumber}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Adicionar quaisquer cabeçalhos de autorização necessários
                },
            }
        );

        response.json(getPackingSlipResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para enviar uma ou mais faturas para pedidos de atendimento direto de um fornecedor
    routes.post('/vendor/directFulfillment/payments/v1/invoices', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para enviar faturas
            const submitInvoiceResponse = await axios.post(
                'https://sellingpartnerapi-na.amazon.com/vendor/directFulfillment/payments/v1/invoices',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(submitInvoiceResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para enviar novas faturas para a Amazon
    routes.post('/vendor/payments/v1/invoices', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para enviar novas faturas
            const submitInvoicesResponse = await axios.post(
                'https://sellingpartnerapi-na.amazon.com/vendor/payments/v1/invoices',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(submitInvoicesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para enviar confirmações de remessa para pedidos de fornecedor
    routes.post('/vendor/shipping/v1/shipmentConfirmations', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para enviar confirmações de remessa
            const submitShipmentConfirmationsResponse = await axios.post(
                'https://sellingpartnerapi-na.amazon.com/vendor/shipping/v1/shipmentConfirmations',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(submitShipmentConfirmationsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter detalhes sobre remessas
    routes.get('/vendor/shipping/v1/shipments', async (request: Request, response: Response) => {
        try {
            const { query } = request;

            // Chamar a API da Amazon para obter detalhes sobre remessas
            const getShipmentDetailsResponse = await axios.get(
                'https://sellingpartnerapi-na.amazon.com/vendor/shipping/v1/shipments',
                {
                    params: {
                        limit: query.limit,
                        sortOrder: query.sortOrder,
                        nextToken: query.nextToken,
                        createdAfter: query.createdAfter,
                        createdBefore: query.createdBefore,
                        shipmentConfirmedBefore: query.shipmentConfirmedBefore,
                        shipmentConfirmedAfter: query.shipmentConfirmedAfter,
                        packageLabelCreatedBefore: query.packageLabelCreatedBefore,
                        packageLabelCreatedAfter: query.packageLabelCreatedAfter,
                        shippedBefore: query.shippedBefore,
                        shippedAfter: query.shippedAfter,
                        estimatedDeliveryBefore: query.estimatedDeliveryBefore,
                        estimatedDeliveryAfter: query.estimatedDeliveryAfter,
                        shipmentDeliveryBefore: query.shipmentDeliveryBefore,
                        shipmentDeliveryAfter: query.shipmentDeliveryAfter,
                        requestedPickUpBefore: query.requestedPickUpBefore,
                        requestedPickUpAfter: query.requestedPickUpAfter,
                        scheduledPickUpBefore: query.scheduledPickUpBefore,
                        scheduledPickUpAfter: query.scheduledPickUpAfter,
                        currentShipmentStatus: query.currentShipmentStatus,
                        vendorShipmentIdentifier: query.vendorShipmentIdentifier,
                        buyerReferenceNumber: query.buyerReferenceNumber,
                        buyerWarehouseCode: query.buyerWarehouseCode,
                        sellerWarehouseCode: query.sellerWarehouseCode,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(getShipmentDetailsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para enviar uma ou mais solicitações de remessa para pedidos de fornecedor
    routes.post('/vendor/shipping/v1/shipments', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para enviar solicitações de remessa
            const submitShipmentsResponse = await axios.post(
                'https://sellingpartnerapi-na.amazon.com/vendor/shipping/v1/shipments',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(submitShipmentsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter o status de uma transação específica
    routes.get('/vendor/transactions/v1/transactions/{transactionId}', async (request: Request, response: Response) => {
        try {
            const { params } = request;

            // Chamar a API da Amazon para obter o status de uma transação específica
            const getTransactionResponse = await axios.get(
                `https://sellingpartnerapi-na.amazon.com/vendor/transactions/v1/transactions/${params.transactionId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(getTransactionResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter uma lista de ordens de compra
    routes.get('/vendor/orders/v1/purchaseOrders', async (request: Request, response: Response) => {
        try {
            const { query } = request;

            // Chamar a API da Amazon para obter uma lista de ordens de compra
            const getPurchaseOrdersResponse = await axios.get(
                'https://sellingpartnerapi-na.amazon.com/vendor/orders/v1/purchaseOrders',
                {
                    params: {
                        limit: query.limit,
                        createdAfter: query.createdAfter,
                        createdBefore: query.createdBefore,
                        sortOrder: query.sortOrder,
                        nextToken: query.nextToken,
                        includeDetails: query.includeDetails,
                        changedAfter: query.changedAfter,
                        changedBefore: query.changedBefore,
                        poItemState: query.poItemState,
                        isPOChanged: query.isPOChanged,
                        purchaseOrderState: query.purchaseOrderState,
                        orderingVendorCode: query.orderingVendorCode,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(getPurchaseOrdersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Rota para obter uma ordem de compra com base no número da ordem de compra
    routes.get('/vendor/orders/v1/purchaseOrders/{purchaseOrderNumber}', async (request: Request, response: Response) => {
        try {
            const { params } = request;

            // Chamar a API da Amazon para obter uma ordem de compra com base no número da ordem de compra
            const getPurchaseOrderResponse = await axios.get(
                `https://sellingpartnerapi-na.amazon.com/vendor/orders/v1/purchaseOrders/${params.purchaseOrderNumber}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(getPurchaseOrderResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para enviar confirmações para uma ou mais ordens de compra
    routes.post('/vendor/orders/v1/acknowledgements', async (request: Request, response: Response) => {
        try {
            const { body } = request;

            // Chamar a API da Amazon para enviar confirmações para ordens de compra
            const submitAcknowledgementResponse = await axios.post(
                'https://sellingpartnerapi-na.amazon.com/vendor/orders/v1/acknowledgements',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(submitAcknowledgementResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter status de ordens de compra
    routes.get('/vendor/orders/v1/purchaseOrdersStatus', async (request: Request, response: Response) => {
        try {
            const { query } = request;

            // Chamar a API da Amazon para obter status de ordens de compra
            const getPurchaseOrdersStatusResponse = await axios.get(
                'https://sellingpartnerapi-na.amazon.com/vendor/orders/v1/purchaseOrdersStatus',
                {
                    params: {
                        limit: query.limit,
                        sortOrder: query.sortOrder,
                        nextToken: query.nextToken,
                        createdAfter: query.createdAfter,
                        createdBefore: query.createdBefore,
                        updatedAfter: query.updatedAfter,
                        updatedBefore: query.updatedBefore,
                        purchaseOrderNumber: query.purchaseOrderNumber,
                        purchaseOrderStatus: query.purchaseOrderStatus,
                        itemConfirmationStatus: query.itemConfirmationStatus,
                        itemReceiveStatus: query.itemReceiveStatus,
                        orderingVendorCode: query.orderingVendorCode,
                        shipToPartyId: query.shipToPartyId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicionar quaisquer cabeçalhos de autorização necessários
                    },
                }
            );

            response.json(getPurchaseOrdersStatusResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
};
// ... (código posterior)
