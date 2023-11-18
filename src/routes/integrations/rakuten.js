"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rakutenApi = void 0;
const axios_1 = __importDefault(require("axios"));
const rakutenApi = (routes) => {
    routes.post('/searchRakutenItems', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { applicationId, keyword, genreId, sort, minPrice, maxPrice, hits, page } = request.body;
            const rakutenApiEndpoint = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';
            const rakutenApiResponse = yield axios_1.default.get(rakutenApiEndpoint, {
                params: {
                    applicationId,
                    keyword,
                    genreId,
                    sort,
                    minPrice,
                    maxPrice,
                    hits,
                    page,
                },
            });
            if (rakutenApiResponse.status === 200) {
                const rakutenResponseData = rakutenApiResponse.data; // Ajuste conforme a estrutura real da resposta
                response.status(200).json(rakutenResponseData);
            }
            else {
                response.status(rakutenApiResponse.status).send("Erro na requisição à API da Rakuten");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Erro interno no servidor");
        }
    }));
    routes.post('/rakuten/itemSearch', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(request.body);
        try {
            const { keyword, genreId, itemCode, shopCode } = request.body;
            // Rakuten API endpoint
            const apiUrl = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';
            const format = 'json';
            const applicationId = '1050682487455494185';
            let apiEndpoint = `${apiUrl}?format=${format}`;
            if (keyword) {
                apiEndpoint += `&keyword=${keyword}`;
            }
            if (genreId) {
                apiEndpoint += `&genreId=${genreId}`;
            }
            if (itemCode) {
                apiEndpoint += `&itemCode=${itemCode}`;
            }
            if (shopCode) {
                apiEndpoint += `&shopCode=${shopCode}`;
            }
            apiEndpoint += `&applicationId=${applicationId}`;
            console.log(apiEndpoint);
            // Make the Rakuten API request
            const rakutenApiResponse = yield axios_1.default.get(apiEndpoint);
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/searchRakutenGenre', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, genreId, applicationId } = request.body;
            const rakutenApiEndpoint = 'https://app.rakuten.co.jp/services/api/IchibaGenre/Search/20140222';
            const rakutenApiResponse = yield axios_1.default.get(rakutenApiEndpoint, {
                params: {
                    format,
                    genreId,
                    applicationId,
                },
            });
            if (rakutenApiResponse.status === 200) {
                const rakutenResponseData = rakutenApiResponse.data;
                // Retornando a resposta completa da API da Rakuten
                response.status(200).json(rakutenResponseData);
            }
            else {
                response.status(rakutenApiResponse.status).send("Erro na requisição à API da Rakuten");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Erro interno no servidor");
        }
    }));
    routes.post('/searchBooks', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, keyword, booksGenreId, isbnjan } = request.body;
            // Make a request to Rakuten Books API
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404', {
                params: {
                    format,
                    applicationId,
                    keyword,
                    booksGenreId,
                    isbnjan
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/searchSpecificBooks', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, title, author, publisherName, size, isbn, booksGenreId } = request.body;
            // Make a request to Rakuten Books API
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404', {
                params: {
                    format,
                    applicationId,
                    title,
                    author,
                    publisherName,
                    size,
                    isbn,
                    booksGenreId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/searchForeignBooks', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, title, author, publisherName, isbn, booksGenreId } = request.body;
            // Make a request to Rakuten Books API for foreign books
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/BooksForeignBook/Search/20170404', {
                params: {
                    format,
                    applicationId,
                    title,
                    author,
                    publisherName,
                    isbn,
                    booksGenreId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/searchMagazines', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, title, author, publisherName, jan, booksGenreId } = request.body;
            // Make a request to Rakuten Books API for magazines
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/BooksMagazine/Search/20170404', {
                params: {
                    format,
                    applicationId,
                    title,
                    author,
                    publisherName,
                    jan,
                    booksGenreId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/searchVideoGames', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, title, hardware, makerCode, label, jan, booksGenreId } = request.body;
            // Make a request to Rakuten Books API for video games
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/BooksGame/Search/20170404', {
                params: {
                    format,
                    applicationId,
                    title,
                    hardware,
                    makerCode,
                    label,
                    jan,
                    booksGenreId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/searchSoftware', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, title, os, makerCode, label, jan, booksGenreId } = request.body;
            // Make a request to Rakuten Books API for software
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/BooksSoftware/Search/20170404', {
                params: {
                    format,
                    applicationId,
                    title,
                    os,
                    makerCode,
                    label,
                    jan,
                    booksGenreId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/searchBookGenre', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, booksGenreId } = request.body;
            // Make a request to Rakuten Books API for book genres
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/BooksGenre/Search/20121128', {
                params: {
                    format,
                    applicationId,
                    booksGenreId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/recipeCategoryList', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId } = request.body;
            // Make a request to Rakuten Recipe API for category list
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426', {
                params: {
                    format,
                    applicationId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/recipeCategoryRanking', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId } = request.body;
            // Make a request to Rakuten Recipe API for category ranking
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426', {
                params: {
                    format,
                    applicationId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/simpleHotelSearch', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId } = request.body;
            // Make a request to Rakuten Travel API for simple hotel search
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426', {
                params: {
                    format,
                    applicationId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/hotelDetailSearch', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId } = request.body;
            // Make a request to Rakuten Travel API for hotel detail search
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426', {
                params: {
                    format,
                    applicationId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/vacantHotelSearch', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, checkinDate, checkoutDate } = request.body;
            // Make a request to Rakuten Travel API for vacant hotel search
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426', {
                params: {
                    format,
                    applicationId,
                    checkinDate,
                    checkoutDate
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/hotelRanking', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, genre, applicationId } = request.body;
            // Make a request to Rakuten Travel API for hotel ranking
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Travel/HotelRanking/20170426', {
                params: {
                    format,
                    genre,
                    applicationId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/hotelChainList', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId } = request.body;
            // Make a request to Rakuten Travel API to get the list of hotel chains
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Travel/GetHotelChainList/20131024', {
                params: {
                    format,
                    applicationId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/getAreaClass', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId } = request.body;
            // Make a request to Rakuten Travel API to get area class information
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Travel/GetAreaClass/20131024', {
                params: {
                    format,
                    applicationId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/keywordHotelSearch', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, keyword } = request.body;
            // Make a request to Rakuten Travel API for keyword hotel search
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426', {
                params: {
                    format,
                    applicationId,
                    keyword
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/searchKoboEbooks', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, keyword, title, author, publisherName, itemNumber, koboGenreId } = request.body;
            // Make a request to Rakuten Kobo eBook Search API
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Kobo/EbookSearch/20170426', {
                params: {
                    format,
                    applicationId,
                    keyword,
                    title,
                    author,
                    publisherName,
                    itemNumber,
                    koboGenreId
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/searchGoraGolfPlans', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { format, applicationId, playDate } = request.body;
            // Make a request to Rakuten Gora Golf Plan Search API
            const rakutenApiResponse = yield axios_1.default.get('https://app.rakuten.co.jp/services/api/Gora/GoraPlanSearch/20170623', {
                params: {
                    format,
                    applicationId,
                    playDate
                }
            });
            // Send the API response to the client
            response.json(rakutenApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
};
exports.rakutenApi = rakutenApi;
