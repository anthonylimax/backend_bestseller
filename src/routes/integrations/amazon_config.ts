import { Request, Response, Router } from "express";
import axios, { AxiosResponse, AxiosError } from 'axios';

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
  
};
// ... (código posterior)
