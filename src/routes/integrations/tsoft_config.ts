import { Request, Response, Router } from "express";
import axios from "axios";

const apiEndpoint = 'https://webservice.tsoft.com.tr';

let accessToken: string | null = null;

export const setRoutes = (routes: Router) => {
  // Rota para verificar se o usuário está logado
  routes.post('/auth/isLogin', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para verificar se o usuário possui um token de acesso.
      // Retorna a resposta apropriada.
      response.json({ message: 'Checking if user is logged in...' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para autenticar o usuário e retornar token e informações do usuário
  routes.post('/auth/login/:user', async (request: Request, response: Response) => {
    try {
      const { user } = request.params;
      const { pass } = request.body;

      // Implemente a lógica de autenticação com base no nome de usuário (user) e senha (pass).
      // Retorna o token e as informações do usuário se a autenticação for bem-sucedida.
      if (user && pass) {
        // Lógica de autenticação aqui (substitua com sua própria lógica)
        const authResponse = await axios.post(`${apiEndpoint}/auth/login/${user}`, { pass });
        response.json(authResponse.data);
      } else {
        response.status(400).json({ error: 'Missing username or password' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter informações da filial com base no código da filial
  routes.get('/branchOffice/getBranchOfficeByCode/:BranchOfficeCode', async (request: Request, response: Response) => {
    try {
      const { BranchOfficeCode } = request.params;

      // Implemente a lógica para obter informações da filial com base no código da filial.
      // Retorna as informações da filial apropriadas.
      if (BranchOfficeCode) {
        // Lógica para obter informações da filial aqui (substitua com sua própria lógica)
        const branchOfficeResponse = await axios.get(`${apiEndpoint}/branchOffice/getBranchOfficeByCode/${BranchOfficeCode}`);
        response.json(branchOfficeResponse.data);
      } else {
        response.status(400).json({ error: 'Missing BranchOfficeCode parameter' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter informações da filial com base no ID da filial
  routes.get('/branchOffice/getBranchOfficeById/:BranchOfficeId', async (request: Request, response: Response) => {
    try {
      const { BranchOfficeId } = request.params;

      // Implemente a lógica para obter informações da filial com base no ID da filial.
      // Retorna as informações da filial apropriadas.
      if (BranchOfficeId) {
        // Lógica para obter informações da filial aqui (substitua com sua própria lógica)
        const branchOfficeResponse = await axios.get(`${apiEndpoint}/branchOffice/getBranchOfficeById/${BranchOfficeId}`);
        response.json(branchOfficeResponse.data);
      } else {
        response.status(400).json({ error: 'Missing BranchOfficeId parameter' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  routes.get('/branchOffice/getBranchOfficeByName/:BranchOfficeName', async (request: Request, response: Response) => {
    try {
      const { BranchOfficeName } = request.params;

      // Implemente a lógica para obter informações da filial com base no nome da filial.
      // Retorna as informações da filial apropriadas.
      if (BranchOfficeName) {
        // Lógica para obter informações da filial aqui (substitua com sua própria lógica)
        const branchOfficeResponse = await axios.get(`${apiEndpoint}/branchOffice/getBranchOfficeByName/${BranchOfficeName}`);
        response.json(branchOfficeResponse.data);
      } else {
        response.status(400).json({ error: 'Missing BranchOfficeName parameter' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter todas as filiais
  routes.post('/branchOffice/getBranchOffices', async (request: Request, response: Response) => {
    try {
      const { IsActive } = request.body;

      // Implemente a lógica para obter todas as filiais.
      // Retorna as informações das filiais apropriadas.
      const branchOfficesResponse = await axios.post(`${apiEndpoint}/branchOffice/getBranchOffices`, { IsActive });
      response.json(branchOfficesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir informações das filiais
  routes.post('/branchOffice/setBranchOffices', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir as informações das filiais.
      // Retorna a resposta apropriada.
      const setBranchOfficesResponse = await axios.post(`${apiEndpoint}/branchOffice/setBranchOffices`, { data });
      response.json(setBranchOfficesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter informações da marca com base no ID da marca
  routes.get('/brand/getBrandById/:id', async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      // Implemente a lógica para obter informações da marca com base no ID da marca.
      // Retorna as informações da marca apropriadas.
      if (id) {
        // Lógica para obter informações da marca aqui (substitua com sua própria lógica)
        const brandResponse = await axios.get(`${apiEndpoint}/brand/getBrandById/${id}`);
        response.json(brandResponse.data);
      } else {
        response.status(400).json({ error: 'Missing ID parameter' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  routes.get('/brand/getBrandByName/:name', async (request: Request, response: Response) => {
    try {
      const { name } = request.params;

      // Implemente a lógica para obter informações da marca com base no nome da marca.
      // Retorna as informações da marca apropriadas.
      if (name) {
        // Lógica para obter informações da marca aqui (substitua com sua própria lógica)
        const brandResponse = await axios.get(`${apiEndpoint}/brand/getBrandByName/${name}`);
        response.json(brandResponse.data);
      } else {
        response.status(400).json({ error: 'Missing name parameter' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter todas as marcas
  routes.post('/brand/getBrands', async (request: Request, response: Response) => {
    try {
      const { FetchShowcase } = request.body;

      // Implemente a lógica para obter todas as marcas.
      // Retorna as informações das marcas apropriadas.
      const brandsResponse = await axios.post(`${apiEndpoint}/brand/getBrands`, { FetchShowcase });
      response.json(brandsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir informações das marcas
  routes.post('/brand/setBrands', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir as informações das marcas.
      // Retorna a resposta apropriada.
      const setBrandsResponse = await axios.post(`${apiEndpoint}/brand/setBrands`, { data });
      response.json(setBrandsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter categorias
  routes.post('/category/getCategories', async (request: Request, response: Response) => {
    try {
      const { start = 50, limit = 500, columns, f, f2, orderby, language } = request.body;

      // Implemente a lógica para obter categorias.
      // Retorna as informações das categorias apropriadas.
      const categoriesResponse = await axios.post(`${apiEndpoint}/category/getCategories`, {
        start,
        limit,
        columns,
        f,
        f2,
        orderby,
        language,
      });
      response.json(categoriesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  routes.get('/category/getCategoryByCode/:CategoryCode', async (request: Request, response: Response) => {
    try {
      const { CategoryCode, language, ...additionalParams } = request.query;

      // Implemente a lógica para obter informações da categoria com base no código da categoria.
      // Retorna as informações da categoria apropriadas.
      if (CategoryCode) {
        // Lógica para obter informações da categoria aqui (substitua com sua própria lógica)
        const categoryResponse = await axios.get(`${apiEndpoint}/category/getCategoryByCode/${CategoryCode}`, {
          params: { language, ...additionalParams },
        });
        response.json(categoryResponse.data);
      } else {
        response.status(400).json({ error: 'Missing CategoryCode parameter' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter informações da categoria com base no ID da categoria
  routes.get('/category/getCategoryById/:CategoryId', async (request: Request, response: Response) => {
    try {
      const { CategoryId, language, ...additionalParams } = request.query;

      // Implemente a lógica para obter informações da categoria com base no ID da categoria.
      // Retorna as informações da categoria apropriadas.
      if (CategoryId) {
        // Lógica para obter informações da categoria aqui (substitua com sua própria lógica)
        const categoryResponse = await axios.get(`${apiEndpoint}/category/getCategoryById/${CategoryId}`, {
          params: { language, ...additionalParams },
        });
        response.json(categoryResponse.data);
      } else {
        response.status(400).json({ error: 'Missing CategoryId parameter' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter informações da categoria com base no nome da categoria
  routes.get('/category/getCategoryByName/:CategoryName', async (request: Request, response: Response) => {
    try {
      const { CategoryName, language, ...additionalParams } = request.query;

      // Implemente a lógica para obter informações da categoria com base no nome da categoria.
      // Retorna as informações da categoria apropriadas.
      if (CategoryName) {
        // Lógica para obter informações da categoria aqui (substitua com sua própria lógica)
        const categoryResponse = await axios.get(`${apiEndpoint}/category/getCategoryByName/${CategoryName}`, {
          params: { language, ...additionalParams },
        });
        response.json(categoryResponse.data);
      } else {
        response.status(400).json({ error: 'Missing CategoryName parameter' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a árvore de categorias
  routes.post('/category/getCategoryTree', async (request: Request, response: Response) => {
    try {
      const { ProductId, node } = request.body;

      // Implemente a lógica para obter a árvore de categorias.
      // Retorna as informações da árvore de categorias apropriadas.
      const categoryTreeResponse = await axios.post(`${apiEndpoint}/category/getCategoryTree`, { ProductId, node });
      response.json(categoryTreeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir informações das categorias
  routes.post('/category/setCategories', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir as informações das categorias.
      // Retorna a resposta apropriada.
      const setCategoriesResponse = await axios.post(`${apiEndpoint}/category/setCategories`, { data });
      response.json(setCategoriesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a árvore de categorias com base no ID do pai e profundidade
  routes.get('/category/tree/:parent_id', async (request: Request, response: Response) => {
    try {
      const { parent_id, depth } = request.params;

      // Implemente a lógica para obter a árvore de categorias com base no ID do pai e profundidade.
      // Retorna as informações da árvore de categorias apropriadas.
      const categoryTreeResponse = await axios.get(`${apiEndpoint}/category/tree/${parent_id}`, {
        params: { depth },
      });
      response.json(categoryTreeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir informações de idioma das categorias
  routes.post('/category/setCategoryLanguage', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir as informações de idioma das categorias.
      // Retorna a resposta apropriada.
      const setCategoryLanguageResponse = await axios.post(`${apiEndpoint}/category/setCategoryLanguage`, { data });
      response.json(setCategoryLanguageResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter informações de conteúdo com base no ID
  routes.get('/content/getContent/:id', async (request: Request, response: Response) => {
    try {
      const { id, start, limit } = request.params;

      // Implemente a lógica para obter informações de conteúdo com base no ID.
      // Retorna as informações de conteúdo apropriadas.
      const contentResponse = await axios.get(`${apiEndpoint}/content/getContent/${id}`, { params: { start, limit } });
      response.json(contentResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar clientes
  routes.post('/customer/addCustomers', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para adicionar clientes.
      // Retorna a resposta apropriada.
      const addCustomersResponse = await axios.post(`${apiEndpoint}/customer/addCustomers`, { data });
      response.json(addCustomersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter endereços do cliente
  routes.post('/customer/getAddress', async (request: Request, response: Response) => {
    try {
      const { CustomerId, CustomerCode, Archive, ...additionalParams } = request.body;

      // Implemente a lógica para obter endereços do cliente.
      // Retorna as informações dos endereços apropriados.
      const getAddressResponse = await axios.post(`${apiEndpoint}/customer/getAddress`, {
        CustomerId,
        CustomerCode,
        Archive,
        ...additionalParams,
      });
      response.json(getAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter um endereço específico do cliente
  routes.get('/customer/address/:address_id', async (request: Request, response: Response) => {
    try {
      const { address_id, customer_id, type, data } = request.params;

      // Implemente a lógica para obter um endereço específico do cliente.
      // Retorna as informações do endereço apropriado.
      const getAddressByIdResponse = await axios.get(`${apiEndpoint}/customer/address/${address_id}`, {
        params: { customer_id, type, data },
      });
      response.json(getAddressByIdResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para verificar se o cliente está registrado com informações de e-mail e senha
  routes.post('/customer/check', async (request: Request, response: Response) => {
    try {
      const { email, phone, password } = request.body;

      // Implemente a lógica para verificar se o cliente está registrado com informações de e-mail e senha.
      // Retorna a resposta apropriada.
      const customerCheckResponse = await axios.post(`${apiEndpoint}/customer/check`, { email, phone, password });
      response.json(customerCheckResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter clientes pelo número de telefone
  routes.get('/customer/getCustomersByPhone/:Phone', async (request: Request, response: Response) => {
    try {
      const { Phone, Archive } = request.params;

      // Implemente a lógica para obter clientes pelo número de telefone.
      // Retorna as informações dos clientes apropriadas.
      const getCustomersByPhoneResponse = await axios.get(`${apiEndpoint}/customer/getCustomersByPhone/${Phone}`, {
        params: { Archive },
      });
      response.json(getCustomersByPhoneResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter grupos de clientes
  routes.get('/customer/getCustomerGroups', async (request: Request, response: Response) => {
    try {
      const { start, limit, f } = request.params;

      // Implemente a lógica para obter grupos de clientes.
      // Retorna as informações dos grupos de clientes apropriadas.
      const getCustomerGroupsResponse = await axios.get(`${apiEndpoint}/customer/getCustomerGroups`, {
        params: { start, limit, f },
      });
      response.json(getCustomerGroupsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter clientes
  routes.get('/customer/getCustomers', async (request: Request, response: Response) => {
    try {
      const {
        CreateDateTimeStart,
        CreateDateTimeEnd,
        UpdateDateTimeStart,
        UpdateDateTimeEnd,
        start,
        limit,
        columns,
        f,
        f2,
        orderby,
        SecretKey,
        FetchAvatar,
        FetchSegment,
        FetchCustomerGroup,
      } = request.params;

      // Implemente a lógica para obter clientes.
      // Retorna as informações dos clientes apropriadas.
      const getCustomersResponse = await axios.get(`${apiEndpoint}/customer/getCustomers`, {
        params: {
          CreateDateTimeStart,
          CreateDateTimeEnd,
          UpdateDateTimeStart,
          UpdateDateTimeEnd,
          start,
          limit,
          columns,
          f,
          f2,
          orderby,
          SecretKey,
          FetchAvatar,
          FetchSegment,
          FetchCustomerGroup,
        },
      });
      response.json(getCustomersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para login do cliente
  routes.post('/customer/login', async (request: Request, response: Response) => {
    try {
      const { customerId, customerCode, loginRedirectUrl } = request.body;

      // Implemente a lógica para login do cliente.
      // Retorna a resposta apropriada.
      const customerLoginResponse = await axios.post(`${apiEndpoint}/customer/login`, {
        customerId,
        customerCode,
        loginRedirectUrl,
      });
      response.json(customerLoginResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir grupos de clientes
  routes.post('/customer/setCustomerGroups', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir grupos de clientes.
      // Retorna a resposta apropriada.
      const setCustomerGroupsResponse = await axios.post(`${apiEndpoint}/customer/setCustomerGroups`, { data });
      response.json(setCustomerGroupsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  routes.post('/customer/setCustomers', async (request: Request, response: Response) => {
    try {
      const { data, IsPasswordEncrypted, MatchWithEmail, MatchWithMobile } = request.body;

      // Implemente a lógica para definir clientes.
      // Retorna a resposta apropriada.
      const setCustomersResponse = await axios.post(`${apiEndpoint}/customer/setCustomers`, {
        data,
        IsPasswordEncrypted,
        MatchWithEmail,
        MatchWithMobile,
      });
      response.json(setCustomersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar o código do cliente
  routes.post('/customer/updateCustomerCode', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar o código do cliente.
      // Retorna a resposta apropriada.
      const updateCustomerCodeResponse = await axios.post(`${apiEndpoint}/customer/updateCustomerCode`, { data });
      response.json(updateCustomerCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar clientes
  routes.post('/customer/updateCustomers', async (request: Request, response: Response) => {
    try {
      const { data, IsPasswordEncrypted, SetCustomerGroupCodeSessions, MatchWithEmail, MatchWithMobile } = request.body;

      // Implemente a lógica para atualizar clientes.
      // Retorna a resposta apropriada.
      const updateCustomersResponse = await axios.post(`${apiEndpoint}/customer/updateCustomers`, {
        data,
        IsPasswordEncrypted,
        SetCustomerGroupCodeSessions,
        MatchWithEmail,
        MatchWithMobile,
      });
      response.json(updateCustomersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para definir lista de desejos do cliente
  routes.post('/customer/setWishList', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir a lista de desejos do cliente.
      // Retorna a resposta apropriada.
      const setWishListResponse = await axios.post(`${apiEndpoint}/customer/setWishList`, { data });
      response.json(setWishListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a lista de desejos do cliente
  routes.get('/customer/getWishList', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter a lista de desejos do cliente.
      // Retorna as informações da lista de desejos apropriadas.
      const getWishListResponse = await axios.get(`${apiEndpoint}/customer/getWishList`);
      response.json(getWishListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter categorias da lista de desejos do cliente
  routes.get('/customer/getWishListCategories', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter categorias da lista de desejos do cliente.
      // Retorna as informações das categorias da lista de desejos apropriadas.
      const getWishListCategoriesResponse = await axios.get(`${apiEndpoint}/customer/getWishListCategories`);
      response.json(getWishListCategoriesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter campos com base no tipo e plataforma
  routes.get('/customer/getFields/:Type', async (request: Request, response: Response) => {
    try {
      const { Type } = request.params;

      // Implemente a lógica para obter campos com base no tipo e plataforma.
      // Retorna as informações dos campos apropriadas.
      const getFieldsResponse = await axios.get(`${apiEndpoint}/customer/getFields/${Type}`);
      response.json(getFieldsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir clientes
  routes.delete('/customer/deleteCustomer', async (request: Request, response: Response) => {
    try {
      const { CustomerIds, CustomerCodes } = request.query;

      // Implemente a lógica para excluir clientes.
      // Retorna a resposta apropriada.
      const deleteCustomerResponse = await axios.delete(`${apiEndpoint}/customer/deleteCustomer`, {
        params: { CustomerIds, CustomerCodes },
      });
      response.json(deleteCustomerResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter informações fiscais
  routes.get('/customer/getTax', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter informações fiscais.
      // Retorna as informações fiscais apropriadas.
      const getTaxResponse = await axios.get(`${apiEndpoint}/customer/getTax`);
      response.json(getTaxResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir grupo de filtro
  routes.post('/filter/setGroup', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir o grupo de filtro.
      // Retorna a resposta apropriada.
      const setGroupResponse = await axios.post(`${apiEndpoint}/filter/setGroup`, { data });
      response.json(setGroupResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para definir opção de filtro
  routes.post('/filter/setOption', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir a opção de filtro.
      // Retorna a resposta apropriada.
      const setOptionResponse = await axios.post(`${apiEndpoint}/filter/setOption`, { data });
      response.json(setOptionResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter filtros por grupo
  routes.get('/filter/get/:GroupId', async (request: Request, response: Response) => {
    try {
      const { GroupId } = request.params;
      const { Translation, start, limit, FetchOptions } = request.query;

      // Implemente a lógica para obter filtros por grupo.
      // Retorna as informações dos filtros apropriadas.
      const getFiltersResponse = await axios.get(`${apiEndpoint}/filter/get/${GroupId}`, {
        params: { Translation, start, limit, FetchOptions },
      });
      response.json(getFiltersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter filtros por código de produto
  routes.get('/filter/getFiltersByProductCode/:ProductCode', async (request: Request, response: Response) => {
    try {
      const { ProductCode } = request.params;

      // Implemente a lógica para obter filtros por código de produto.
      // Retorna as informações dos filtros apropriadas.
      const getFiltersByProductCodeResponse = await axios.get(`${apiEndpoint}/filter/getFiltersByProductCode/${ProductCode}`);
      response.json(getFiltersByProductCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar grupo ao produto
  routes.post('/filter/addGroupToProduct', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para adicionar grupo ao produto.
      // Retorna a resposta apropriada.
      const addGroupToProductResponse = await axios.post(`${apiEndpoint}/filter/addGroupToProduct`, { data });
      response.json(addGroupToProductResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir grupo do produto
  routes.post('/filter/deleteGroupFromProduct', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para excluir grupo do produto.
      // Retorna a resposta apropriada.
      const deleteGroupFromProductResponse = await axios.post(`${apiEndpoint}/filter/deleteGroupFromProduct`, { data });
      response.json(deleteGroupFromProductResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir valores de filtro
  routes.post('/filter/setFilterValues', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir valores de filtro.
      // Retorna a resposta apropriada.
      const setFilterValuesResponse = await axios.post(`${apiEndpoint}/filter/setFilterValues`, { data });
      response.json(setFilterValuesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar movimentos de fundos
  routes.post('/fundMovement/addFundMovements', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para adicionar movimentos de fundos.
      // Retorna a resposta apropriada.
      const addFundMovementsResponse = await axios.post(`${apiEndpoint}/fundMovement/addFundMovements`, { data });
      response.json(addFundMovementsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter movimento de fundos por código
  routes.get('/fundMovement/getFundMovementByCode/:FundMovementCode', async (request: Request, response: Response) => {
    try {
      const { FundMovementCode } = request.params;

      // Implemente a lógica para obter movimento de fundos por código.
      // Retorna as informações do movimento de fundos apropriadas.
      const getFundMovementByCodeResponse = await axios.get(`${apiEndpoint}/fundMovement/getFundMovementByCode/${FundMovementCode}`);
      response.json(getFundMovementByCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
// Rota para obter movimento de fundos por ID
routes.get('/fundMovement/getFundMovementById/:FundMovementId', async (request: Request, response: Response) => {
    try {
      const { FundMovementId } = request.params;

      // Implemente a lógica para obter movimento de fundos por ID.
      // Retorna as informações do movimento de fundos apropriadas.
      const getFundMovementByIdResponse = await axios.get(`${apiEndpoint}/fundMovement/getFundMovementById/${FundMovementId}`);
      response.json(getFundMovementByIdResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter movimentos de fundos
  routes.get('/fundMovement/getFundMovements', async (request: Request, response: Response) => {
    try {
      const { FundMovementDateTimeStart, FundMovementDateTimeEnd, FundMovementCode, CustomerCode, FetchAdditionalCustomerData } = request.query;
      const { start, limit, columns, f, f2, orderby } = request.query;

      // Implemente a lógica para obter movimentos de fundos.
      // Retorna as informações dos movimentos de fundos apropriadas.
      const getFundMovementsResponse = await axios.get(`${apiEndpoint}/fundMovement/getFundMovements`, {
        params: { FundMovementDateTimeStart, FundMovementDateTimeEnd, FundMovementCode, CustomerCode, FetchAdditionalCustomerData, start, limit, columns, f, f2, orderby },
      });
      response.json(getFundMovementsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para marcar movimento de fundos
  routes.post('/fundMovement/markFundMovement/:FundMovementCode', async (request: Request, response: Response) => {
    try {
      const { FundMovementCode } = request.params;
      const { val } = request.query;

      // Implemente a lógica para marcar movimento de fundos.
      // Retorna a resposta apropriada.
      const markFundMovementResponse = await axios.post(`${apiEndpoint}/fundMovement/markFundMovement/${FundMovementCode}`, { val });
      response.json(markFundMovementResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir movimentos de fundos
  routes.post('/fundMovement/deleteFundMovements', async (request: Request, response: Response) => {
    try {
      const { FundMovementId, FundMovementCode, CustomerId, CustomerCode } = request.query;
      const { f, f2 } = request.query;

      // Implemente a lógica para excluir movimentos de fundos.
      // Retorna a resposta apropriada.
      const deleteFundMovementsResponse = await axios.post(`${apiEndpoint}/fundMovement/deleteFundMovements`, { FundMovementId, FundMovementCode, CustomerId, CustomerCode, f, f2 });
      response.json(deleteFundMovementsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir movimentos de fundos
  routes.post('/fundMovement/setFundMovements', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir movimentos de fundos.
      // Retorna a resposta apropriada.
      const setFundMovementsResponse = await axios.post(`${apiEndpoint}/fundMovement/setFundMovements`, { data });
      response.json(setFundMovementsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar movimentos de fundos
  routes.post('/fundMovement/updateFundMovements', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar movimentos de fundos.
      // Retorna a resposta apropriada.
      const updateFundMovementsResponse = await axios.post(`${apiEndpoint}/fundMovement/updateFundMovements`, { data });
      response.json(updateFundMovementsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para definir transferências bancárias
  routes.post('/payment/setWireTransfers', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir transferências bancárias.
      // Retorna a resposta apropriada.
      const setWireTransfersResponse = await axios.post(`${apiEndpoint}/payment/setWireTransfers`, { data });
      response.json(setWireTransfersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter transferências bancárias
  routes.get('/payment/getWireTransfers', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter transferências bancárias.
      // Retorna as informações das transferências bancárias apropriadas.
      const getWireTransfersResponse = await axios.get(`${apiEndpoint}/payment/getWireTransfers`);
      response.json(getWireTransfersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para operações móveis (mobile/index)
  routes.get('/mobile/index', async (request: Request, response: Response) => {
    try {
      const { fetch_product_detail, fetch_installment_list, image_limit } = request.query;

      // Implemente a lógica para operações móveis (mobile/index).
      // Retorna as informações apropriadas com base nos parâmetros fornecidos.
      // Certifique-se de implementar a lógica para cada cenário de parâmetro.
      // Exemplo: if (fetch_product_detail) { /* lógica */ }
      const mobileIndexResponse = await axios.get(`${apiEndpoint}/mobile/index`, { params: { fetch_product_detail, fetch_installment_list, image_limit } });
      response.json(mobileIndexResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para links móveis (mobile/link)
  routes.get('/mobile/link', async (request: Request, response: Response) => {
    try {
      const { link } = request.query;

      // Implemente a lógica para operações móveis (mobile/link).
      // Retorna as informações apropriadas com base no link fornecido.
      const mobileLinkResponse = await axios.get(`${apiEndpoint}/mobile/link`, { params: { link } });
      response.json(mobileLinkResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter pedidos móveis (mobile/getOrders2)
  routes.get('/mobile/getOrders2', async (request: Request, response: Response) => {
    try {
      const { MobileToken, FetchShipmentDetail } = request.query;
      const { start, limit, columns, f, f2, orderby } = request.query;

      // Implemente a lógica para obter pedidos móveis (mobile/getOrders2).
      // Retorna as informações dos pedidos apropriadas com base nos parâmetros fornecidos.
      const getOrders2Response = await axios.get(`${apiEndpoint}/mobile/getOrders2`, { params: { MobileToken, FetchShipmentDetail, start, limit, columns, f, f2, orderby } });
      response.json(getOrders2Response.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter cliente móvel (mobile/getCustomer)
  routes.get('/mobile/getCustomer', async (request: Request, response: Response) => {
    try {
      const { MobileToken } = request.query;

      // Implemente a lógica para obter o cliente móvel (mobile/getCustomer).
      // Retorna as informações do cliente apropriadas com base no MobileToken fornecido.
      const getMobileCustomerResponse = await axios.get(`${apiEndpoint}/mobile/getCustomer`, { params: { MobileToken } });
      response.json(getMobileCustomerResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar cliente móvel (mobile/updateCustomer)
  routes.post('/mobile/updateCustomer', async (request: Request, response: Response) => {
    try {
      const { MobileToken, data } = request.body;

      // Implemente a lógica para atualizar o cliente móvel (mobile/updateCustomer).
      // Retorna a resposta apropriada.
      const updateMobileCustomerResponse = await axios.post(`${apiEndpoint}/mobile/updateCustomer`, { MobileToken, data });
      response.json(updateMobileCustomerResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para excluir cliente móvel (mobile/deleteCustomer)
  routes.post('/mobile/deleteCustomer', async (request: Request, response: Response) => {
    try {
      const { MobileToken } = request.body;

      // Implemente a lógica para excluir o cliente móvel (mobile/deleteCustomer).
      // Retorna a resposta apropriada.
      const deleteMobileCustomerResponse = await axios.post(`${apiEndpoint}/mobile/deleteCustomer`, { MobileToken });
      response.json(deleteMobileCustomerResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar à lista de favoritos (mobile/addToFavoriteList)
  routes.post('/mobile/addToFavoriteList', async (request: Request, response: Response) => {
    try {
      const { MobileToken, ProductId, SubProductId } = request.body;

      // Implemente a lógica para adicionar à lista de favoritos (mobile/addToFavoriteList).
      // Retorna a resposta apropriada.
      const addToFavoriteListResponse = await axios.post(`${apiEndpoint}/mobile/addToFavoriteList`, { MobileToken, ProductId, SubProductId });
      response.json(addToFavoriteListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir da lista de favoritos (mobile/deleteFromFavoriteList)
  routes.post('/mobile/deleteFromFavoriteList', async (request: Request, response: Response) => {
    try {
      const { MobileToken, ProductId, SubProductId } = request.body;

      // Implemente a lógica para excluir da lista de favoritos (mobile/deleteFromFavoriteList).
      // Retorna a resposta apropriada.
      const deleteFromFavoriteListResponse = await axios.post(`${apiEndpoint}/mobile/deleteFromFavoriteList`, { MobileToken, ProductId, SubProductId });
      response.json(deleteFromFavoriteListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a lista de favoritos (mobile/getFavoriteList)
  routes.post('/mobile/getFavoriteList', async (request: Request, response: Response) => {
    try {
      const { MobileToken } = request.body;

      // Implemente a lógica para obter a lista de favoritos (mobile/getFavoriteList).
      // Retorna as informações da lista de favoritos apropriadas.
      const getFavoriteListResponse = await axios.post(`${apiEndpoint}/mobile/getFavoriteList`, { MobileToken });
      response.json(getFavoriteListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter a lista de alarmes (mobile/getAlarmList)
  routes.get('/mobile/getAlarmList', async (request: Request, response: Response) => {
    try {
      const { MobileToken, ProductId, SubProductId, AlarmType, start, limit, orderby, f, f2, FetchProductData } = request.query;

      // Implemente a lógica para obter a lista de alarmes (mobile/getAlarmList).
      // Retorna as informações da lista de alarmes apropriadas.
      const getAlarmListResponse = await axios.get(`${apiEndpoint}/mobile/getAlarmList`, {
        params: { MobileToken, ProductId, SubProductId, AlarmType, start, limit, orderby, f, f2, FetchProductData },
      });
      response.json(getAlarmListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar alarme (mobile/addAlarm)
  routes.post('/mobile/addAlarm', async (request: Request, response: Response) => {
    try {
      const { MobileToken, ProductId, SubProductId, AlarmType, AlarmDay, CurrentPrice, AlarmPrice, Currency, VatIncluded, StockLimit } = request.body;

      // Implemente a lógica para adicionar alarme (mobile/addAlarm).
      // Retorna a resposta apropriada.
      const addAlarmResponse = await axios.post(`${apiEndpoint}/mobile/addAlarm`, {
        MobileToken, ProductId, SubProductId, AlarmType, AlarmDay, CurrentPrice, AlarmPrice, Currency, VatIncluded, StockLimit,
      });
      response.json(addAlarmResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir alarme (mobile/deleteAlarm)
  routes.post('/mobile/deleteAlarm', async (request: Request, response: Response) => {
    try {
      const { MobileToken, AlarmId } = request.body;

      // Implemente a lógica para excluir alarme (mobile/deleteAlarm).
      // Retorna a resposta apropriada.
      const deleteAlarmResponse = await axios.post(`${apiEndpoint}/mobile/deleteAlarm`, { MobileToken, AlarmId });
      response.json(deleteAlarmResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter retorno do pedido (mobile/getOrderReturn/{OrderId})
  routes.get('/mobile/getOrderReturn/:OrderId', async (request: Request, response: Response) => {
    try {
      const { OrderId, MobileToken, OrderCode } = request.params;

      // Implemente a lógica para obter retorno do pedido (mobile/getOrderReturn).
      // Retorna as informações de retorno do pedido apropriadas.
      const getOrderReturnResponse = await axios.get(`${apiEndpoint}/mobile/getOrderReturn/${OrderId}`, {
        params: { MobileToken, OrderCode },
      });
      response.json(getOrderReturnResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir retorno do pedido (mobile/setOrderReturn)
  routes.post('/mobile/setOrderReturn', async (request: Request, response: Response) => {
    try {
      const { MobileToken, data } = request.body;

      // Implemente a lógica para definir retorno do pedido (mobile/setOrderReturn).
      // Retorna a resposta apropriada.
      const setOrderReturnResponse = await axios.post(`${apiEndpoint}/mobile/setOrderReturn`, { MobileToken, data });
      response.json(setOrderReturnResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para definir localização (mobile/setLocation)
  routes.post('/mobile/setLocation', async (request: Request, response: Response) => {
    try {
      const { MobileToken, data } = request.body;

      // Implemente a lógica para definir localização (mobile/setLocation).
      // Retorna a resposta apropriada.
      const setLocationResponse = await axios.post(`${apiEndpoint}/mobile/setLocation`, { MobileToken, data });
      response.json(setLocationResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter horários de entrega disponíveis (mobile/availableDeliveryTimes)
  routes.get('/mobile/availableDeliveryTimes', async (request: Request, response: Response) => {
    try {
      const { MobileToken } = request.query;

      // Implemente a lógica para obter horários de entrega disponíveis (mobile/availableDeliveryTimes).
      // Retorna as informações de horários de entrega apropriadas.
      const availableDeliveryTimesResponse = await axios.get(`${apiEndpoint}/mobile/availableDeliveryTimes`, {
        params: { MobileToken },
      });
      response.json(availableDeliveryTimesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir horário de entrega (mobile/setDeliveryTime)
  routes.post('/mobile/setDeliveryTime', async (request: Request, response: Response) => {
    try {
      const { MobileToken, Id, Date } = request.body;

      // Implemente a lógica para definir horário de entrega (mobile/setDeliveryTime).
      // Retorna a resposta apropriada.
      const setDeliveryTimeResponse = await axios.post(`${apiEndpoint}/mobile/setDeliveryTime`, { MobileToken, Id, Date });
      response.json(setDeliveryTimeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter lista de cupons (mobile/getCouponList)
  routes.get('/mobile/getCouponList', async (request: Request, response: Response) => {
    try {
      const { MobileToken } = request.query;

      // Implemente a lógica para obter lista de cupons (mobile/getCouponList).
      // Retorna as informações da lista de cupons apropriadas.
      const getCouponListResponse = await axios.get(`${apiEndpoint}/mobile/getCouponList`, {
        params: { MobileToken },
      });
      response.json(getCouponListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter endereço (mobile/getAddress)
  routes.get('/mobile/getAddress', async (request: Request, response: Response) => {
    try {
      const { MobileToken, Page } = request.query;

      // Implemente a lógica para obter endereço (mobile/getAddress).
      // Retorna as informações do endereço apropriado.
      const getAddressResponse = await axios.get(`${apiEndpoint}/mobile/getAddress`, {
        params: { MobileToken, Page },
      });
      response.json(getAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir endereço (mobile/setAddress)
  routes.post('/mobile/setAddress', async (request: Request, response: Response) => {
    try {
      const { MobileToken, data } = request.body;

      // Implemente a lógica para definir endereço (mobile/setAddress).
      // Retorna a resposta apropriada.
      const setAddressResponse = await axios.post(`${apiEndpoint}/mobile/setAddress`, { MobileToken, data });
      response.json(setAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir endereço (mobile/deleteAddress/{AddressId})
  routes.post('/mobile/deleteAddress/:AddressId', async (request: Request, response: Response) => {
    try {
      const { AddressId, MobileToken } = request.params;

      // Implemente a lógica para excluir endereço (mobile/deleteAddress).
      // Retorna a resposta apropriada.
      const deleteAddressResponse = await axios.post(`${apiEndpoint}/mobile/deleteAddress/${AddressId}`, { MobileToken });
      response.json(deleteAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter modelo por ID (model/getModelById/{ModelId})
  routes.get('/model/getModelById/:ModelId', async (request: Request, response: Response) => {
    try {
      const { ModelId } = request.params;

      // Implemente a lógica para obter modelo por ID (model/getModelById).
      // Retorna as informações do modelo apropriado.
      const getModelByIdResponse = await axios.get(`${apiEndpoint}/model/getModelById/${ModelId}`);
      response.json(getModelByIdResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter modelo por nome (model/getModelByName/{ModelName})
  routes.get('/model/getModelByName/:ModelName', async (request: Request, response: Response) => {
    try {
      const { ModelName } = request.params;

      // Implemente a lógica para obter modelo por nome (model/getModelByName).
      // Retorna as informações do modelo apropriado.
      const getModelByNameResponse = await axios.get(`${apiEndpoint}/model/getModelByName/${ModelName}`);
      response.json(getModelByNameResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter modelos (model/getModels)
  routes.get('/model/getModels', async (request: Request, response: Response) => {
    try {
      const { start, limit, columns, f, f2, orderby } = request.query;

      // Implemente a lógica para obter modelos (model/getModels).
      // Retorna as informações dos modelos apropriados.
      const getModelsResponse = await axios.get(`${apiEndpoint}/model/getModels`, {
        params: { start, limit, columns, f, f2, orderby },
      });
      response.json(getModelsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir modelos (model/setModels)
  routes.post('/model/setModels', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir modelos (model/setModels).
      // Retorna a resposta apropriada.
      const setModelsResponse = await axios.post(`${apiEndpoint}/model/setModels`, { data });
      response.json(setModelsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir pedidos (order2/deleteOrders)
  routes.post('/order2/deleteOrders', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para excluir pedidos (order2/deleteOrders).
      // Retorna a resposta apropriada.
      const deleteOrdersResponse = await axios.post(`${apiEndpoint}/order2/deleteOrders`, { data });
      response.json(deleteOrdersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter lista de empresas de transporte (order2/getCargoCompanyList)
  routes.get('/order2/getCargoCompanyList', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter lista de empresas de transporte (order2/getCargoCompanyList).
      // Retorna as informações da lista de empresas de transporte apropriadas.
      const getCargoCompanyListResponse = await axios.get(`${apiEndpoint}/order2/getCargoCompanyList`);
      response.json(getCargoCompanyListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter preços de transporte (order2/getCargoPricing/{CompanyId})
  routes.get('/order2/getCargoPricing/:CompanyId', async (request: Request, response: Response) => {
    try {
      const { CompanyId } = request.params;

      // Implemente a lógica para obter preços de transporte (order2/getCargoPricing).
      // Retorna as informações de preços de transporte apropriadas.
      const getCargoPricingResponse = await axios.get(`${apiEndpoint}/order2/getCargoPricing/${CompanyId}`);
      response.json(getCargoPricingResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter ID do cliente do pedido (order2/getCustomerIdOfOrder/{OrderId})
  routes.get('/order2/getCustomerIdOfOrder/:OrderId', async (request: Request, response: Response) => {
    try {
      const { OrderId } = request.params;

      // Implemente a lógica para obter ID do cliente do pedido (order2/getCustomerIdOfOrder).
      // Retorna as informações do cliente apropriado.
      const getCustomerIdOfOrderResponse = await axios.get(`${apiEndpoint}/order2/getCustomerIdOfOrder/${OrderId}`);
      response.json(getCustomerIdOfOrderResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter detalhes do pedido (order2/getOrderDetails)
  routes.get('/order2/getOrderDetails', async (request: Request, response: Response) => {
    try {
      const { OrderStatusId, Archive, start, limit, columns, f, f2 } = request.query;

      // Implemente a lógica para obter detalhes do pedido (order2/getOrderDetails).
      // Retorna as informações dos detalhes do pedido apropriados.
      const getOrderDetailsResponse = await axios.get(`${apiEndpoint}/order2/getOrderDetails`, {
        params: { OrderStatusId, Archive, start, limit, columns, f, f2 },
      });
      response.json(getOrderDetailsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter detalhes do pedido por ID do pedido (order2/getOrderDetailsByOrderId/{OrderId})
  routes.get('/order2/getOrderDetailsByOrderId/:OrderId', async (request: Request, response: Response) => {
    try {
      const { OrderId, Archive, start, limit, columns, f, f2, orderby } = request.query;

      // Implemente a lógica para obter detalhes do pedido por ID do pedido (order2/getOrderDetailsByOrderId).
      // Retorna as informações dos detalhes do pedido apropriados.
      const getOrderDetailsByOrderIdResponse = await axios.get(`${apiEndpoint}/order2/getOrderDetailsByOrderId/${OrderId}`, {
        params: { Archive, start, limit, columns, f, f2, orderby },
      });
      response.json(getOrderDetailsByOrderIdResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter pedidos (order2/getOrders)
  routes.get('/order2/getOrders', async (request: Request, response: Response) => {
    try {
      const {
        OrderDateTimeStart,
        OrderDateTimeEnd,
        UpdateDateTimeStart,
        UpdateDateTimeEnd,
        OrderCode,
        OrderStatusId,
        IsTransferred,
        Archive,
        FetchCustomerGroupInfo,
        IsVendor,
        CustomerGroupCode,
        FetchInvoiceDetails,
        InvoiceNumber,
        InvoiceDateTimeStart,
        InvoiceDateTimeEnd,
        noDetails,
        FetchProductData,
        FetchProductDetail,
        FetchPackageContent,
        FetchCampaignData,
        FetchAdditionalCustomerData,
        FetchAdditionalCustomerAllData,
        FetchAdditionalCCNumber,
        FetchOrderContract,
        FetchAdditionalTransaction,
        start,
        limit,
        columns,
        f,
        f2,
        orderby,
      } = request.query;

      // Implemente a lógica para obter pedidos (order2/getOrders).
      // Retorna as informações dos pedidos apropriados.
      const getOrdersResponse = await axios.get(`${apiEndpoint}/order2/getOrders`, {
        params: {
          OrderDateTimeStart,
          OrderDateTimeEnd,
          UpdateDateTimeStart,
          UpdateDateTimeEnd,
          OrderCode,
          OrderStatusId,
          IsTransferred,
          Archive,
          FetchCustomerGroupInfo,
          IsVendor,
          CustomerGroupCode,
          FetchInvoiceDetails,
          InvoiceNumber,
          InvoiceDateTimeStart,
          InvoiceDateTimeEnd,
          noDetails,
          FetchProductData,
          FetchProductDetail,
          FetchPackageContent,
          FetchCampaignData,
          FetchAdditionalCustomerData,
          FetchAdditionalCustomerAllData,
          FetchAdditionalCCNumber,
          FetchOrderContract,
          FetchAdditionalTransaction,
          start,
          limit,
          columns,
          f,
          f2,
          orderby,
        },
      });
      response.json(getOrdersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter a lista de status do pedido (order2/getOrderStatusList)
  routes.get('/order2/getOrderStatusList', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter a lista de status do pedido (order2/getOrderStatusList).
      // Retorna as informações da lista de status do pedido apropriadas.
      const getOrderStatusListResponse = await axios.get(`${apiEndpoint}/order2/getOrderStatusList`);
      response.json(getOrderStatusListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a lista de tipos de pagamento (order2/getPaymentTypeList)
  routes.get('/order2/getPaymentTypeList', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter a lista de tipos de pagamento (order2/getPaymentTypeList).
      // Retorna as informações da lista de tipos de pagamento apropriadas.
      const getPaymentTypeListResponse = await axios.get(`${apiEndpoint}/order2/getPaymentTypeList`);
      response.json(getPaymentTypeListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter o status do envio (order2/getPostStatus)
  routes.get('/order2/getPostStatus', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter o status do envio (order2/getPostStatus).
      // Retorna as informações do status do envio apropriadas.
      const getPostStatusResponse = await axios.get(`${apiEndpoint}/order2/getPostStatus`);
      response.json(getPostStatusResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir o status do envio (order2/setPostStatus)
  routes.post('/order2/setPostStatus', async (request: Request, response: Response) => {
    try {
      const { order, status, postNote } = request.body;

      // Implemente a lógica para definir o status do envio (order2/setPostStatus).
      // Retorna a confirmação do status do envio apropriado.
      const setPostStatusResponse = await axios.post(`${apiEndpoint}/order2/setPostStatus`, { order, status, postNote });
      response.json(setPostStatusResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir o status de fornecimento (order2/setSupplyStatus)
  routes.post('/order2/setSupplyStatus', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir o status de fornecimento (order2/setSupplyStatus).
      // Retorna a confirmação do status de fornecimento apropriado.
      const setSupplyStatusResponse = await axios.post(`${apiEndpoint}/order2/setSupplyStatus`, { data });
      response.json(setSupplyStatusResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar os detalhes da fatura (order2/updateInvoiceDetails)
  routes.post('/order2/updateInvoiceDetails', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar os detalhes da fatura (order2/updateInvoiceDetails).
      // Retorna a confirmação da atualização dos detalhes da fatura apropriada.
      const updateInvoiceDetailsResponse = await axios.post(`${apiEndpoint}/order2/updateInvoiceDetails`, { data });
      response.json(updateInvoiceDetailsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para atualizar o status do pedido como cancelado (order2/updateOrderStatusAsCancelled)
  routes.post('/order2/updateOrderStatusAsCancelled', async (request: Request, response: Response) => {
    try {
      const { data, archive } = request.body;

      // Implemente a lógica para atualizar o status do pedido como cancelado (order2/updateOrderStatusAsCancelled).
      // Retorna a confirmação da atualização do status do pedido como cancelado apropriado.
      const updateOrderStatusAsCancelledResponse = await axios.post(`${apiEndpoint}/order2/updateOrderStatusAsCancelled`, { data, archive });
      response.json(updateOrderStatusAsCancelledResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar o status do pedido como pronto para envio (order2/updateOrderStatusAsCargoReady)
  routes.post('/order2/updateOrderStatusAsCargoReady', async (request: Request, response: Response) => {
    try {
      const { data, archive } = request.body;

      // Implemente a lógica para atualizar o status do pedido como pronto para envio (order2/updateOrderStatusAsCargoReady).
      // Retorna a confirmação da atualização do status do pedido como pronto para envio apropriado.
      const updateOrderStatusAsCargoReadyResponse = await axios.post(`${apiEndpoint}/order2/updateOrderStatusAsCargoReady`, { data, archive });
      response.json(updateOrderStatusAsCargoReadyResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar o status do pedido como entregue (order2/updateOrderStatusAsDelivered)
  routes.post('/order2/updateOrderStatusAsDelivered', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar o status do pedido como entregue (order2/updateOrderStatusAsDelivered).
      // Retorna a confirmação da atualização do status do pedido como entregue apropriado.
      const updateOrderStatusAsDeliveredResponse = await axios.post(`${apiEndpoint}/order2/updateOrderStatusAsDelivered`, { data });
      response.json(updateOrderStatusAsDeliveredResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar o status do pedido como enviado para carga (order2/updateOrderStatusAsSentToCargo)
  routes.post('/order2/updateOrderStatusAsSentToCargo', async (request: Request, response: Response) => {
    try {
      const { data, archive } = request.body;

      // Implemente a lógica para atualizar o status do pedido como enviado para carga (order2/updateOrderStatusAsSentToCargo).
      // Retorna a confirmação da atualização do status do pedido como enviado para carga apropriado.
      const updateOrderStatusAsSentToCargoResponse = await axios.post(`${apiEndpoint}/order2/updateOrderStatusAsSentToCargo`, { data, archive });
      response.json(updateOrderStatusAsSentToCargoResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar o status do pedido como (order2/updateOrderStatusAs/{OrderStatusId})
  routes.post('/order2/updateOrderStatusAs/:OrderStatusId', async (request: Request, response: Response) => {
    try {
      const { OrderStatusId } = request.params;
      const { data, archive } = request.body;

      // Implemente a lógica para atualizar o status do pedido como (order2/updateOrderStatusAs/{OrderStatusId}).
      // Retorna a confirmação da atualização do status do pedido apropriado.
      const updateOrderStatusAsResponse = await axios.post(`${apiEndpoint}/order2/updateOrderStatusAs/${OrderStatusId}`, { data, archive });
      response.json(updateOrderStatusAsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
// Rota para definir o status de transferência do pedido (order2/setTransferredStatus)
routes.post('/order2/setTransferredStatus', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir o status de transferência do pedido (order2/setTransferredStatus).
      // Retorna a confirmação da definição do status de transferência do pedido apropriado.
      const setTransferredStatusResponse = await axios.post(`${apiEndpoint}/order2/setTransferredStatus`, { data });
      response.json(setTransferredStatusResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para rastreamento de carga (order2/cargoTracking/{OrderId})
  routes.get('/order2/cargoTracking/:OrderId', async (request: Request, response: Response) => {
    try {
      const { OrderId } = request.params;

      // Implemente a lógica para rastreamento de carga (order2/cargoTracking/{OrderId}).
      // Retorna informações de rastreamento de carga apropriadas com base no OrderId.
      const cargoTrackingResponse = await axios.get(`${apiEndpoint}/order2/cargoTracking/${OrderId}`);
      response.json(cargoTrackingResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter notas do pedido (order2/getOrderNote)
  routes.get('/order2/getOrderNote', async (request: Request, response: Response) => {
    try {
      const { OrderId, OrderCode, f, f2, archive } = request.query;

      // Implemente a lógica para obter notas do pedido (order2/getOrderNote).
      // Retorna notas do pedido apropriadas com base nos parâmetros fornecidos.
      const getOrderNoteResponse = await axios.get(`${apiEndpoint}/order2/getOrderNote`, { params: { OrderId, OrderCode, f, f2, archive } });
      response.json(getOrderNoteResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir notas do pedido (order2/setOrderNote)
  routes.post('/order2/setOrderNote', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir notas do pedido (order2/setOrderNote).
      // Retorna a confirmação da definição de notas do pedido apropriada.
      const setOrderNoteResponse = await axios.post(`${apiEndpoint}/order2/setOrderNote`, { data });
      response.json(setOrderNoteResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para calcular preços do pedido (order/calculatePrices)
  routes.post('/order/calculatePrices', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para calcular os preços do pedido (order/calculatePrices).
      // Retorna os preços calculados com base nos dados fornecidos.
      const calculatePricesResponse = await axios.post(`${apiEndpoint}/order/calculatePrices`, { data });
      response.json(calculatePricesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para desarquivar pedidos (order/unArchive)
  routes.post('/order/unArchive', async (request: Request, response: Response) => {
    try {
      const { OrderIds, OrderCodes } = request.body;

      // Implemente a lógica para desarquivar pedidos (order/unArchive).
      // Retorna a confirmação de desarquivamento apropriada com base nos parâmetros fornecidos.
      const unArchiveResponse = await axios.post(`${apiEndpoint}/order/unArchive`, { OrderIds, OrderCodes });
      response.json(unArchiveResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para arquivar pedidos (order/archive)
  routes.post('/order/archive', async (request: Request, response: Response) => {
    try {
      const { OrderIds, OrderCodes } = request.body;

      // Implemente a lógica para arquivar pedidos (order/archive).
      // Retorna a confirmação de arquivamento apropriada com base nos parâmetros fornecidos.
      const archiveResponse = await axios.post(`${apiEndpoint}/order/archive`, { OrderIds, OrderCodes });
      response.json(archiveResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter região de entrega (order/getDeliveryRegion)
  routes.get('/order/getDeliveryRegion', async (request: Request, response: Response) => {
    try {
      const { Type, ParentCode, Name, ParentName, FetchCityAndDistrict, start, limit } = request.query;

      // Implemente a lógica para obter região de entrega (order/getDeliveryRegion).
      // Retorna informações de região de entrega apropriadas com base nos parâmetros fornecidos.
      const getDeliveryRegionResponse = await axios.get(`${apiEndpoint}/order/getDeliveryRegion`, {
        params: { Type, ParentCode, Name, ParentName, FetchCityAndDistrict, start, limit },
      });
      response.json(getDeliveryRegionResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir região de entrega (order/setDeliveryRegion)
  routes.post('/order/setDeliveryRegion', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir região de entrega (order/setDeliveryRegion).
      // Retorna a confirmação da definição de região de entrega apropriada.
      const setDeliveryRegionResponse = await axios.post(`${apiEndpoint}/order/setDeliveryRegion`, { data });
      response.json(setDeliveryRegionResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter lista de status de devolução (order/getReturnStatusList)
  routes.get('/order/getReturnStatusList', async (request: Request, response: Response) => {
    try {
      const { start, limit, f, f2 } = request.query;

      // Implemente a lógica para obter a lista de status de devolução (order/getReturnStatusList).
      // Retorna a lista de status de devolução apropriada com base nos parâmetros fornecidos.
      const getReturnStatusListResponse = await axios.get(`${apiEndpoint}/order/getReturnStatusList`, {
        params: { start, limit, f, f2 },
      });
      response.json(getReturnStatusListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter lista de motivos de devolução (order/getReturnReasonList)
  routes.get('/order/getReturnReasonList', async (request: Request, response: Response) => {
    try {
      const { start, limit, f, f2 } = request.query;

      // Implemente a lógica para obter a lista de motivos de devolução (order/getReturnReasonList).
      // Retorna a lista de motivos de devolução apropriada com base nos parâmetros fornecidos.
      const getReturnReasonListResponse = await axios.get(`${apiEndpoint}/order/getReturnReasonList`, {
        params: { start, limit, f, f2 },
      });
      response.json(getReturnReasonListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir dados personalizados (order/setCustomData)
  routes.post('/order/setCustomData', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir dados personalizados (order/setCustomData).
      // Retorna a confirmação da definição de dados personalizados apropriada.
      const setCustomDataResponse = await axios.post(`${apiEndpoint}/order/setCustomData`, { data });
      response.json(setCustomDataResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para criar remessa (order/createShipment)
  routes.post('/order/createShipment', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para criar remessa (order/createShipment).
      // Retorna a confirmação da criação de remessa apropriada.
      const createShipmentResponse = await axios.post(`${apiEndpoint}/order/createShipment`, { data });
      response.json(createShipmentResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para cancelar remessa (order/cancelShipment)
  routes.post('/order/cancelShipment', async (request: Request, response: Response) => {
    try {
      const { ShipmentId } = request.body;

      // Implemente a lógica para cancelar remessa (order/cancelShipment).
      // Retorna a confirmação do cancelamento de remessa apropriada com base nos parâmetros fornecidos.
      const cancelShipmentResponse = await axios.post(`${apiEndpoint}/order/cancelShipment`, { ShipmentId });
      response.json(cancelShipmentResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter nota (order/getNote)
  routes.get('/order/getNote', async (request: Request, response: Response) => {
    try {
      const { start, limit, orderby, f, f2, FetchDetail } = request.query;

      // Implemente a lógica para obter nota (order/getNote).
      // Retorna informações de nota apropriadas com base nos parâmetros fornecidos.
      const getNoteResponse = await axios.get(`${apiEndpoint}/order/getNote`, {
        params: { start, limit, orderby, f, f2, FetchDetail },
      });
      response.json(getNoteResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter pacotes de pedidos (order/getOrderPackage)
  routes.get('/order/getOrderPackage', async (request: Request, response: Response) => {
    try {
      const { OrderDateTimeStart, OrderDateTimeEnd, UpdateDateTimeStart, UpdateDateTimeEnd, OrderCode, OrderStatusId, IsTransferred, Archive, Translation, start, limit, columns, f, f2, orderby } = request.query;

      // Implemente a lógica para obter pacotes de pedidos (order/getOrderPackage).
      // Retorna os pacotes de pedidos apropriados com base nos parâmetros fornecidos.
      const getOrderPackageResponse = await axios.get(`${apiEndpoint}/order/getOrderPackage`, {
        params: { OrderDateTimeStart, OrderDateTimeEnd, UpdateDateTimeStart, UpdateDateTimeEnd, OrderCode, OrderStatusId, IsTransferred, Archive, Translation, start, limit, columns, f, f2, orderby },
      });
      response.json(getOrderPackageResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir remessa (order/setShipment)
  routes.post('/order/setShipment', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir remessa (order/setShipment).
      // Retorna a confirmação da definição de remessa apropriada.
      const setShipmentResponse = await axios.post(`${apiEndpoint}/order/setShipment`, { data });
      response.json(setShipmentResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar status do pacote (order/updatePackageStatus)
  routes.post('/order/updatePackageStatus', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar status do pacote (order/updatePackageStatus).
      // Retorna a confirmação da atualização de status do pacote apropriada.
      const updatePackageStatusResponse = await axios.post(`${apiEndpoint}/order/updatePackageStatus`, { data });
      response.json(updatePackageStatusResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter formulário de personalização (personalization/getForm/{FormId})
  routes.get('/personalization/getForm/:FormId', async (request: Request, response: Response) => {
    try {
      const { FormId } = request.params;

      // Implemente a lógica para obter formulário de personalização (personalization/getForm).
      // Retorna o formulário de personalização apropriado com base no ID do formulário fornecido.
      const getFormResponse = await axios.get(`${apiEndpoint}/personalization/getForm/${FormId}`);
      response.json(getFormResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter códigos de rastreamento (trackingCode/get)
  routes.get('/trackingCode/get', async (request: Request, response: Response) => {
    try {
      const { Id, GeneratedBy, start, limit, columns } = request.query;

      // Implemente a lógica para obter códigos de rastreamento (trackingCode/get).
      // Retorna os códigos de rastreamento apropriados com base nos parâmetros fornecidos.
      const getTrackingCodesResponse = await axios.get(`${apiEndpoint}/trackingCode/get`, {
        params: { Id, GeneratedBy, start, limit, columns },
      });
      response.json(getTrackingCodesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir códigos de rastreamento (trackingCode/set)
  routes.post('/trackingCode/set', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir códigos de rastreamento (trackingCode/set).
      // Retorna a confirmação da definição de códigos de rastreamento apropriada.
      const setTrackingCodesResponse = await axios.post(`${apiEndpoint}/trackingCode/set`, { data });
      response.json(setTrackingCodesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir códigos de rastreamento (trackingCode/delete)
  routes.post('/trackingCode/delete', async (request: Request, response: Response) => {
    try {
      const { Id, GeneratedBy } = request.body;

      // Implemente a lógica para excluir códigos de rastreamento (trackingCode/delete).
      // Retorna a confirmação da exclusão de códigos de rastreamento apropriada.
      const deleteTrackingCodesResponse = await axios.post(`${apiEndpoint}/trackingCode/delete`, { Id, GeneratedBy });
      response.json(deleteTrackingCodesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
// Rota para obter produtos (product/get)
routes.get('/product/get', async (request: Request, response: Response) => {
    try {
      const { ProductId, ProductIds, ProductCode, Barcode, ProductName, Translation, start, limit, columns, f, f2, orderby, CustomerGroupCode, FlexiblePrices, StockFields, FetchDiscountedPriceDetail, FetchPackageProducts, FetchFilters, FetchDetails, FetchAllCategories, FetchImageUrls, FetchMultipleDiscount, FetchTags, FetchRelatedBlocks, FetchSubProducts, TranslateCategoryPath } = request.query;

      // Implemente a lógica para obter produtos (product/get).
      // Retorna os produtos apropriados com base nos parâmetros fornecidos.
      const getProductResponse = await axios.get(`${apiEndpoint}/product/get`, {
        params: { ProductId, ProductIds, ProductCode, Barcode, ProductName, Translation, start, limit, columns, f, f2, orderby, CustomerGroupCode, FlexiblePrices, StockFields, FetchDiscountedPriceDetail, FetchPackageProducts, FetchFilters, FetchDetails, FetchAllCategories, FetchImageUrls, FetchMultipleDiscount, FetchTags, FetchRelatedBlocks, FetchSubProducts, TranslateCategoryPath },
      });
      response.json(getProductResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar categoria a um produto (product/addCategory)
  routes.post('/product/addCategory', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para adicionar categoria a um produto (product/addCategory).
      // Retorna a confirmação da adição de categoria apropriada.
      const addCategoryResponse = await axios.post(`${apiEndpoint}/product/addCategory`, { data });
      response.json(addCategoryResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar imagem de arquivo a um produto (product/addImageFromFile)
  routes.post('/product/addImageFromFile/:ProductCode', async (request: Request, response: Response) => {
    try {
      const { ProductCode } = request.params;
      const { image, list_number, ImageSizeWidthHeightControl } = request.body;

      // Implemente a lógica para adicionar imagem de arquivo a um produto (product/addImageFromFile).
      // Retorna a confirmação da adição de imagem apropriada.
      const addImageFromFileResponse = await axios.post(`${apiEndpoint}/product/addImageFromFile/${ProductCode}`, { image, list_number, ImageSizeWidthHeightControl });
      response.json(addImageFromFileResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar imagem de link a um produto (product/addImageFromLink)
  routes.post('/product/addImageFromLink', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para adicionar imagem de link a um produto (product/addImageFromLink).
      // Retorna a confirmação da adição de imagem apropriada.
      const addImageFromLinkResponse = await axios.post(`${apiEndpoint}/product/addImageFromLink`, { data });
      response.json(addImageFromLinkResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar comentário a um produto (product/comment)
  routes.post('/product/comment', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para adicionar comentário a um produto (product/comment).
      // Retorna a confirmação da adição de comentário apropriada.
      const addCommentResponse = await axios.post(`${apiEndpoint}/product/comment`, { data });
      response.json(addCommentResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para criar produtos (product/createProducts)
  routes.post('/product/createProducts', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para criar produtos (product/createProducts).
      // Retorna a confirmação da criação de produtos apropriada.
      const createProductsResponse = await axios.post(`${apiEndpoint}/product/createProducts`, { data });
      response.json(createProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para deletar imagens de produto (product/deleteProductImages)
  routes.post('/product/deleteProductImages', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para deletar imagens de produto (product/deleteProductImages).
      // Retorna a confirmação da deleção de imagem apropriada.
      const deleteProductImagesResponse = await axios.post(`${apiEndpoint}/product/deleteProductImages`, { data });
      response.json(deleteProductImagesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para deletar produtos (product/deleteProducts)
  routes.post('/product/deleteProducts', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para deletar produtos (product/deleteProducts).
      // Retorna a confirmação da deleção de produtos apropriada.
      const deleteProductsResponse = await axios.post(`${apiEndpoint}/product/deleteProducts`, { data });
      response.json(deleteProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para encontrar produtos (product/find/{product})
  routes.get('/product/find/:product', async (request: Request, response: Response) => {
    try {
      const { product } = request.params;
      const { product_ids, related, category, store, supplier, brand, model, barcode, tag, q, stock, price, type1, type2, discounted, sort, pg, perpage, currency_id, fetch_product_detail, fetch_filters_for_detail, fetch_installment_list, fetch_comments, fetch_passive_products, variant_id, image_limit, without_cache, with_passive_sub_products } = request.query;

      // Implemente a lógica para encontrar produtos (product/find/{product}).
      // Retorna os produtos apropriados com base nos parâmetros fornecidos.
      const findProductResponse = await axios.get(`${apiEndpoint}/product/find/${product}`, {
        params: { product_ids, related, category, store, supplier, brand, model, barcode, tag, q, stock, price, type1, type2, discounted, sort, pg, perpage, currency_id, fetch_product_detail, fetch_filters_for_detail, fetch_installment_list, fetch_comments, fetch_passive_products, variant_id, image_limit, without_cache, with_passive_sub_products },
      });
      response.json(findProductResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter grupo de propriedades ativas de um produto (product/getActivePropertyGroup/{ProductId})
  routes.get('/product/getActivePropertyGroup/:ProductId', async (request: Request, response: Response) => {
    try {
      const { ProductId } = request.params;

      // Implemente a lógica para obter grupo de propriedades ativas de um produto (product/getActivePropertyGroup/{ProductId}).
      // Retorna o grupo de propriedades ativas apropriado.
      const getActivePropertyGroupResponse = await axios.get(`${apiEndpoint}/product/getActivePropertyGroup/${ProductId}`);
      response.json(getActivePropertyGroupResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter comentários de produtos (product/getComments)
  routes.get('/product/getComments', async (request: Request, response: Response) => {
    try {
      const { start, limit, columns, f, f2, orderby } = request.query;

      // Implemente a lógica para obter comentários de produtos (product/getComments).
      // Retorna os comentários de produtos apropriados.
      const getCommentsResponse = await axios.get(`${apiEndpoint}/product/getComments`, {
        params: { start, limit, columns, f, f2, orderby },
      });
      response.json(getCommentsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter a lista de moedas (product/getCurrencyList)
  routes.get('/product/getCurrencyList', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter a lista de moedas (product/getCurrencyList).
      // Retorna a lista de moedas apropriada.
      const getCurrencyListResponse = await axios.get(`${apiEndpoint}/product/getCurrencyList`);
      response.json(getCurrencyListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a lista de tipos de desconto (product/getDiscountTypeList)
  routes.get('/product/getDiscountTypeList', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter a lista de tipos de desconto (product/getDiscountTypeList).
      // Retorna a lista de tipos de desconto apropriada.
      const getDiscountTypeListResponse = await axios.get(`${apiEndpoint}/product/getDiscountTypeList`);
      response.json(getDiscountTypeListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter filtros pelo ID do grupo (productFilter/getFilters/{GroupId})
  routes.get('/productFilter/getFilters/:GroupId', async (request: Request, response: Response) => {
    try {
      const { GroupId } = request.params;

      // Implemente a lógica para obter filtros pelo ID do grupo (productFilter/getFilters/{GroupId}).
      // Retorna os filtros apropriados com base no ID do grupo fornecido.
      const getFiltersResponse = await axios.get(`${apiEndpoint}/productFilter/getFilters/${GroupId}`);
      response.json(getFiltersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter filtros pelo código do produto (productFilter/getFiltersByProductCode/{ProductCode})
  routes.get('/productFilter/getFiltersByProductCode/:ProductCode', async (request: Request, response: Response) => {
    try {
      const { ProductCode } = request.params;

      // Implemente a lógica para obter filtros pelo código do produto (productFilter/getFiltersByProductCode/{ProductCode}).
      // Retorna os filtros apropriados com base no código do produto fornecido.
      const getFiltersByProductCodeResponse = await axios.get(`${apiEndpoint}/productFilter/getFiltersByProductCode/${ProductCode}`);
      response.json(getFiltersByProductCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter produtos pelo código de barras (product/getProductByBarcode/{Barcode})
  routes.get('/product/getProductByBarcode/:Barcode', async (request: Request, response: Response) => {
    try {
      const { Barcode } = request.params;
      const { Barcodes, FetchDiscountedPrice, FetchImageUrls } = request.query;

      // Implemente a lógica para obter produtos pelo código de barras (product/getProductByBarcode/{Barcode}).
      // Retorna os produtos apropriados com base no código de barras fornecido.
      const getProductByBarcodeResponse = await axios.get(`${apiEndpoint}/product/getProductByBarcode/${Barcode}`, {
        params: { Barcodes, FetchDiscountedPrice, FetchImageUrls },
      });
      response.json(getProductByBarcodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter produtos pelo código do produto (product/getProductByCode/{ProductCode})
  routes.get('/product/getProductByCode/:ProductCode', async (request: Request, response: Response) => {
    try {
      const { ProductCode } = request.params;
      const { ProductCodes, FetchDiscountedPrice, FetchImageUrls, FetchMultipleDiscount } = request.query;

      // Implemente a lógica para obter produtos pelo código do produto (product/getProductByCode/{ProductCode}).
      // Retorna os produtos apropriados com base no código do produto fornecido.
      const getProductByCodeResponse = await axios.get(`${apiEndpoint}/product/getProductByCode/${ProductCode}`, {
        params: { ProductCodes, FetchDiscountedPrice, FetchImageUrls, FetchMultipleDiscount },
      });
      response.json(getProductByCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter produtos pelo ID do produto (product/getProductById/{ProductId})
  routes.get('/product/getProductById/:ProductId', async (request: Request, response: Response) => {
    try {
      const { ProductId } = request.params;
      const { ProductIds, ImageSize, FetchDiscountedPrice, FetchImageUrls, FetchMultipleDiscount } = request.query;

      // Implemente a lógica para obter produtos pelo ID do produto (product/getProductById/{ProductId}).
      // Retorna os produtos apropriados com base no ID do produto fornecido.
      const getProductByIdResponse = await axios.get(`${apiEndpoint}/product/getProductById/${ProductId}`, {
        params: { ProductIds, ImageSize, FetchDiscountedPrice, FetchImageUrls, FetchMultipleDiscount },
      });
      response.json(getProductByIdResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
// Rota para obter produtos pelo nome do produto (product/getProductByName/{ProductName})
routes.get('/product/getProductByName/:ProductName', async (request: Request, response: Response) => {
    try {
      const { ProductName } = request.params;

      // Implemente a lógica para obter produtos pelo nome do produto (product/getProductByName/{ProductName}).
      // Retorna os produtos apropriados com base no nome do produto fornecido.
      const getProductByNameResponse = await axios.get(`${apiEndpoint}/product/getProductByName/${ProductName}`);
      response.json(getProductByNameResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter produtos pelo código do fornecedor (product/getProductBySupplierProductCode/{SupplierProductCode})
  routes.get('/product/getProductBySupplierProductCode/:SupplierProductCode', async (request: Request, response: Response) => {
    try {
      const { SupplierProductCode } = request.params;

      // Implemente a lógica para obter produtos pelo código do fornecedor (product/getProductBySupplierProductCode/{SupplierProductCode}).
      // Retorna os produtos apropriados com base no código do fornecedor fornecido.
      const getProductBySupplierProductCodeResponse = await axios.get(`${apiEndpoint}/product/getProductBySupplierProductCode/${SupplierProductCode}`);
      response.json(getProductBySupplierProductCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter detalhes do produto (product/getProductDetail)
  routes.get('/product/getProductDetail', async (request: Request, response: Response) => {
    try {
      const { ProductId, ProductCode, limit, start, columns, f, f2, orderby, OnlyDetail } = request.query;

      // Implemente a lógica para obter detalhes do produto (product/getProductDetail).
      // Retorna os detalhes do produto apropriados com base nos parâmetros fornecidos.
      const getProductDetailResponse = await axios.get(`${apiEndpoint}/product/getProductDetail`, {
        params: { ProductId, ProductCode, limit, start, columns, f, f2, orderby, OnlyDetail },
      });
      response.json(getProductDetailResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter imagens do produto pelo ID do produto (product/getProductImages/{ProductId})
  routes.get('/product/getProductImages/:ProductId', async (request: Request, response: Response) => {
    try {
      const { ProductId } = request.params;

      // Implemente a lógica para obter imagens do produto pelo ID do produto (product/getProductImages/{ProductId}).
      // Retorna as imagens do produto apropriadas com base no ID do produto fornecido.
      const getProductImagesResponse = await axios.get(`${apiEndpoint}/product/getProductImages/${ProductId}`);
      response.json(getProductImagesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter imagens do produto pelo código do produto (product/getProductImagesByCode/{ProductCode})
  routes.get('/product/getProductImagesByCode/:ProductCode', async (request: Request, response: Response) => {
    try {
      const { ProductCode } = request.params;

      // Implemente a lógica para obter imagens do produto pelo código do produto (product/getProductImagesByCode/{ProductCode}).
      // Retorna as imagens do produto apropriadas com base no código do produto fornecido.
      const getProductImagesByCodeResponse = await axios.get(`${apiEndpoint}/product/getProductImagesByCode/${ProductCode}`);
      response.json(getProductImagesByCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter produtos (product/getProducts)
  routes.get('/product/getProducts', async (request: Request, response: Response) => {
    try {
      const { limit, start, columns, f, f2, orderby, FetchDiscountedPrice, FetchAllCategories, FetchPriceWithComma, FetchMultipleDiscount } = request.query;

      // Implemente a lógica para obter produtos (product/getProducts).
      // Retorna os produtos apropriados com base nos parâmetros fornecidos.
      const getProductsResponse = await axios.get(`${apiEndpoint}/product/getProducts`, {
        params: { limit, start, columns, f, f2, orderby, FetchDiscountedPrice, FetchAllCategories, FetchPriceWithComma, FetchMultipleDiscount },
      });
      response.json(getProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter produtos pelo código da categoria (product/getProductsByCategoryCode/{CategoryCode})
  routes.get('/product/getProductsByCategoryCode/:CategoryCode', async (request: Request, response: Response) => {
    try {
      const { CategoryCode, start, limit, columns, f, f2, orderby, CategorySortLevel, FetchDiscountedPrice } = request.query;

      // Implemente a lógica para obter produtos pelo código da categoria (product/getProductsByCategoryCode/{CategoryCode}).
      // Retorna os produtos apropriados com base no código da categoria fornecido.
      const getProductsByCategoryCodeResponse = await axios.get(`${apiEndpoint}/product/getProductsByCategoryCode/${CategoryCode}`, {
        params: { start, limit, columns, f, f2, orderby, CategorySortLevel, FetchDiscountedPrice },
      });
      response.json(getProductsByCategoryCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter o total de produtos (product/getProductTotal)
  routes.get('/product/getProductTotal', async (_: Request, response: Response) => {
    try {
      // Implemente a lógica para obter o total de produtos (product/getProductTotal).
      // Retorna o total de produtos disponíveis.
      const getProductTotalResponse = await axios.get(`${apiEndpoint}/product/getProductTotal`);
      response.json(getProductTotalResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a lista de configurações SEO (product/getSeoSettingList)
  routes.get('/product/getSeoSettingList', async (_: Request, response: Response) => {
    try {
      // Implemente a lógica para obter a lista de configurações SEO (product/getSeoSettingList).
      // Retorna a lista de configurações SEO disponíveis.
      const getSeoSettingListResponse = await axios.get(`${apiEndpoint}/product/getSeoSettingList`);
      response.json(getSeoSettingListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a lista de unidades de estoque (product/getStockUnitList)
  routes.get('/product/getStockUnitList', async (_: Request, response: Response) => {
    try {
      // Implemente a lógica para obter a lista de unidades de estoque (product/getStockUnitList).
      // Retorna a lista de unidades de estoque disponíveis.
      const getStockUnitListResponse = await axios.get(`${apiEndpoint}/product/getStockUnitList`);
      response.json(getStockUnitListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter a lista de fornecedores (product/getSupplierList)
  routes.get('/product/getSupplierList', async (_: Request, response: Response) => {
    try {
      // Implemente a lógica para obter a lista de fornecedores (product/getSupplierList).
      // Retorna a lista de fornecedores disponíveis.
      const getSupplierListResponse = await axios.get(`${apiEndpoint}/product/getSupplierList`);
      response.json(getSupplierListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para remover categoria de um produto (product/removeCategory)
  routes.post('/product/removeCategory', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para remover categoria de um produto (product/removeCategory).
      // Remove a categoria especificada do produto com base nos dados fornecidos.
      const removeCategoryResponse = await axios.post(`${apiEndpoint}/product/removeCategory`, data);
      response.json(removeCategoryResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir produtos complementares (product/setComplementaryProducts/{MainProductCode})
  routes.post('/product/setComplementaryProducts/:MainProductCode', async (request: Request, response: Response) => {
    try {
      const { MainProductCode } = request.params;
      const { data } = request.body;

      // Implemente a lógica para definir produtos complementares (product/setComplementaryProducts/{MainProductCode}).
      // Define os produtos complementares com base nos dados fornecidos.
      const setComplementaryProductsResponse = await axios.post(`${apiEndpoint}/product/setComplementaryProducts/${MainProductCode}`, data);
      response.json(setComplementaryProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir grupos de filtros para categorias (productFilter/setFilterGroupCategory)
  routes.post('/productFilter/setFilterGroupCategory', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir grupos de filtros para categorias (productFilter/setFilterGroupCategory).
      // Define os grupos de filtros para a categoria com base nos dados fornecidos.
      const setFilterGroupCategoryResponse = await axios.post(`${apiEndpoint}/productFilter/setFilterGroupCategory`, data);
      response.json(setFilterGroupCategoryResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir valores de filtro para produtos (productFilter/setFilterValues)
  routes.post('/productFilter/setFilterValues', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir valores de filtro para produtos (productFilter/setFilterValues).
      // Define os valores de filtro para o produto com base nos dados fornecidos.
      const setFilterValuesResponse = await axios.post(`${apiEndpoint}/productFilter/setFilterValues`, data);
      response.json(setFilterValuesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir o idioma do produto (product/setProductLanguage)
  routes.post('/product/setProductLanguage', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir o idioma do produto (product/setProductLanguage).
      // Define as informações do produto no idioma especificado com base nos dados fornecidos.
      const setProductLanguageResponse = await axios.post(`${apiEndpoint}/product/setProductLanguage`, data);
      response.json(setProductLanguageResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter o idioma do produto (product/getProductLanguage/{ProductCode})
  routes.get('/product/getProductLanguage/:ProductCode', async (request: Request, response: Response) => {
    try {
      const { ProductCode, Language } = request.params;

      // Implemente a lógica para obter o idioma do produto (product/getProductLanguage/{ProductCode}).
      // Retorna as informações do produto no idioma especificado.
      const getProductLanguageResponse = await axios.get(`${apiEndpoint}/product/getProductLanguage/${ProductCode}`, {
        params: { Language },
      });
      response.json(getProductLanguageResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para definir produtos (product/setProducts)
  routes.post('/product/setProducts', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir produtos (product/setProducts).
      // Define os produtos com base nos dados fornecidos.
      const setProductsResponse = await axios.post(`${apiEndpoint}/product/setProducts`, data);
      response.json(setProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir o status de produtos em lote (product/setProductsStatus)
  routes.post('/product/setProductsStatus', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir o status de produtos em lote (product/setProductsStatus).
      // Define o status dos produtos com base nos dados fornecidos.
      const setProductsStatusResponse = await axios.post(`${apiEndpoint}/product/setProductsStatus`, data);
      response.json(setProductsStatusResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir o status de um produto específico (product/setProductStatus/{ProductCode})
  routes.post('/product/setProductStatus/:ProductCode', async (request: Request, response: Response) => {
    try {
      const { ProductCode } = request.params;
      const { status } = request.body;

      // Implemente a lógica para definir o status de um produto específico (product/setProductStatus/{ProductCode}).
      // Define o status do produto com base nos dados fornecidos.
      const setProductStatusResponse = await axios.post(`${apiEndpoint}/product/setProductStatus/${ProductCode}`, { status });
      response.json(setProductStatusResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir produtos relacionados (product/setRelatedProducts/{ProductCode})
  routes.post('/product/setRelatedProducts/:ProductCode', async (request: Request, response: Response) => {
    try {
      const { ProductCode } = request.params;
      const { data } = request.body;

      // Implemente a lógica para definir produtos relacionados (product/setRelatedProducts/{ProductCode}).
      // Define os produtos relacionados com base nos dados fornecidos.
      const setRelatedProductsResponse = await axios.post(`${apiEndpoint}/product/setRelatedProducts/${ProductCode}`, data);
      response.json(setRelatedProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir produtos relacionados em lote (product/setRelatedProducts)
  routes.post('/product/setRelatedProducts', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir produtos relacionados em lote (product/setRelatedProducts).
      // Define os produtos relacionados com base nos dados fornecidos.
      const setRelatedProductsBatchResponse = await axios.post(`${apiEndpoint}/product/setRelatedProducts`, data);
      response.json(setRelatedProductsBatchResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir a categoria padrão de um produto (product/setDefaultCategory)
  routes.post('/product/setDefaultCategory', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir a categoria padrão de um produto (product/setDefaultCategory).
      // Define a categoria padrão do produto com base nos dados fornecidos.
      const setDefaultCategoryResponse = await axios.post(`${apiEndpoint}/product/setDefaultCategory`, data);
      response.json(setDefaultCategoryResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
// Rota para atualizar o status de um comentário (product/updateCommentStatus/{CommentId})
routes.post('/product/updateCommentStatus/:CommentId', async (request: Request, response: Response) => {
    try {
      const { CommentId } = request.params;
      const { status } = request.body;

      // Implemente a lógica para atualizar o status de um comentário (product/updateCommentStatus/{CommentId}).
      // Atualiza o status do comentário com base nos dados fornecidos.
      const updateCommentStatusResponse = await axios.post(`${apiEndpoint}/product/updateCommentStatus/${CommentId}`, { status });
      response.json(updateCommentStatusResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar os preços de grupos de clientes (product/updateCustomerGroupPrice)
  routes.post('/product/updateCustomerGroupPrice', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar os preços de grupos de clientes (product/updateCustomerGroupPrice).
      // Atualiza os preços de grupos de clientes com base nos dados fornecidos.
      const updateCustomerGroupPriceResponse = await axios.post(`${apiEndpoint}/product/updateCustomerGroupPrice`, data);
      response.json(updateCustomerGroupPriceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar os preços de produtos (product/updatePrice)
  routes.post('/product/updatePrice', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar os preços de produtos (product/updatePrice).
      // Atualiza os preços dos produtos com base nos dados fornecidos.
      const updatePriceResponse = await axios.post(`${apiEndpoint}/product/updatePrice`, data);
      response.json(updatePriceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar os preços flexíveis de produtos (product/updateFlexiblePrice)
  routes.post('/product/updateFlexiblePrice', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar os preços flexíveis de produtos (product/updateFlexiblePrice).
      // Atualiza os preços flexíveis dos produtos com base nos dados fornecidos.
      const updateFlexiblePriceResponse = await axios.post(`${apiEndpoint}/product/updateFlexiblePrice`, data);
      response.json(updateFlexiblePriceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar produtos (product/updateProducts)
  routes.post('/product/updateProducts', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar produtos (product/updateProducts).
      // Atualiza os produtos com base nos dados fornecidos.
      const updateProductsResponse = await axios.post(`${apiEndpoint}/product/updateProducts`, data);
      response.json(updateProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para redefinir o estoque de todos os produtos (product/resetAllStock/{Stock})
  routes.post('/product/resetAllStock/:Stock', async (request: Request, response: Response) => {
    try {
      const { Stock } = request.params;

      // Implemente a lógica para redefinir o estoque de todos os produtos (product/resetAllStock/{Stock}).
      // Redefine o estoque de todos os produtos com base no valor fornecido.
      const resetAllStockResponse = await axios.post(`${apiEndpoint}/product/resetAllStock/${Stock}`);
      response.json(resetAllStockResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a lista de alarmes (product/getAlarmList)
  routes.post('/product/getAlarmList', async (request: Request, response: Response) => {
    try {
      const { CustomerId, ProductId, SubProductId, AlarmType, OnlyCurrentTime, OnlyNotSend, SendingType, start, limit, orderby, f, f2 } = request.body;

      // Implemente a lógica para obter a lista de alarmes (product/getAlarmList).
      // Obtém a lista de alarmes com base nos parâmetros fornecidos.
      const getAlarmListResponse = await axios.post(`${apiEndpoint}/product/getAlarmList`, { CustomerId, ProductId, SubProductId, AlarmType, OnlyCurrentTime, OnlyNotSend, SendingType, start, limit, orderby, f, f2 });
      response.json(getAlarmListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para marcar um alarme como enviado (product/markAlarmAsSent/{AlarmId})
  routes.post('/product/markAlarmAsSent/:AlarmId', async (request: Request, response: Response) => {
    try {
      const { AlarmId } = request.params;
      const { SendingType } = request.body;

      // Implemente a lógica para marcar um alarme como enviado (product/markAlarmAsSent/{AlarmId}).
      // Marca o alarme como enviado com base nos dados fornecidos.
      const markAlarmAsSentResponse = await axios.post(`${apiEndpoint}/product/markAlarmAsSent/${AlarmId}`, { SendingType });
      response.json(markAlarmAsSentResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir o número de ordenação da categoria (product/setCategorySortNumber)
  routes.post('/product/setCategorySortNumber', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir o número de ordenação da categoria (product/setCategorySortNumber).
      // Define o número de ordenação da categoria com base nos dados fornecidos.
      const setCategorySortNumberResponse = await axios.post(`${apiEndpoint}/product/setCategorySortNumber`, data);
      response.json(setCategorySortNumberResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir descontos múltiplos (product/setMultiDiscount)
  routes.post('/product/setMultiDiscount', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir descontos múltiplos (product/setMultiDiscount).
      // Define descontos múltiplos com base nos dados fornecidos.
      const setMultiDiscountResponse = await axios.post(`${apiEndpoint}/product/setMultiDiscount`, data);
      response.json(setMultiDiscountResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para remover descontos múltiplos (product/removeMultiDiscount)
  routes.post('/product/removeMultiDiscount', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para remover descontos múltiplos (product/removeMultiDiscount).
      // Remove descontos múltiplos com base nos dados fornecidos.
      const removeMultiDiscountResponse = await axios.post(`${apiEndpoint}/product/removeMultiDiscount`, data);
      response.json(removeMultiDiscountResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter campos específicos (product/fields/{Type})
  routes.post('/product/fields/:Type', async (request: Request, response: Response) => {
    try {
      const { Type, OnlyActive } = request.body;

      // Implemente a lógica para obter campos específicos (product/fields/{Type}).
      // Obtém campos específicos com base nos parâmetros fornecidos.
      const getFieldsResponse = await axios.post(`${apiEndpoint}/product/fields/${Type}`, { OnlyActive });
      response.json(getFieldsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter a lista de unidades de estoque (product/getStockUnit)
  routes.post('/product/getStockUnit', async (request: Request, response: Response) => {
    try {
      const { limit, start, f, f2 } = request.body;

      // Implemente a lógica para obter a lista de unidades de estoque (product/getStockUnit).
      // Obtém a lista de unidades de estoque com base nos parâmetros fornecidos.
      const getStockUnitResponse = await axios.post(`${apiEndpoint}/product/getStockUnit`, { limit, start, f, f2 });
      response.json(getStockUnitResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir a unidade de estoque (product/setStockUnit)
  routes.post('/product/setStockUnit', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir a unidade de estoque (product/setStockUnit).
      // Define a unidade de estoque com base nos dados fornecidos.
      const setStockUnitResponse = await axios.post(`${apiEndpoint}/product/setStockUnit`, data);
      response.json(setStockUnitResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir parcelas (product/setInstallment)
  routes.post('/product/setInstallment', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir parcelas (product/setInstallment).
      // Define parcelas com base nos dados fornecidos.
      const setInstallmentResponse = await axios.post(`${apiEndpoint}/product/setInstallment`, data);
      response.json(setInstallmentResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter taxas de câmbio (setting/getExchangeRates/{Currency})
  routes.post('/setting/getExchangeRates/:Currency', async (request: Request, response: Response) => {
    try {
      const { Currency } = request.params;
      const { Date, start, limit } = request.body;

      // Implemente a lógica para obter taxas de câmbio (setting/getExchangeRates/{Currency}).
      // Obtém taxas de câmbio com base nos parâmetros fornecidos.
      const getExchangeRatesResponse = await axios.post(`${apiEndpoint}/setting/getExchangeRates/${Currency}`, { Date, start, limit });
      response.json(getExchangeRatesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter configurações por chave (setting/getSettingByKey/{Key})
  routes.post('/setting/getSettingByKey/:Key', async (request: Request, response: Response) => {
    try {
      const { Key } = request.params;

      // Implemente a lógica para obter configurações por chave (setting/getSettingByKey/{Key}).
      // Obtém configurações por chave com base nos parâmetros fornecidos.
      const getSettingByKeyResponse = await axios.post(`${apiEndpoint}/setting/getSettingByKey/${Key}`);
      response.json(getSettingByKeyResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter configurações por categoria (setting/getSettingByCategory/{CategoryId})
  routes.post('/setting/getSettingByCategory/:CategoryId', async (request: Request, response: Response) => {
    try {
      const { CategoryId } = request.params;

      // Implemente a lógica para obter configurações por categoria (setting/getSettingByCategory/{CategoryId}).
      // Obtém configurações por categoria com base nos parâmetros fornecidos.
      const getSettingByCategoryResponse = await axios.post(`${apiEndpoint}/setting/getSettingByCategory/${CategoryId}`);
      response.json(getSettingByCategoryResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter categorias de configurações (setting/getSettingCategories)
  routes.post('/setting/getSettingCategories', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter categorias de configurações (setting/getSettingCategories).
      // Obtém categorias de configurações com base nos parâmetros fornecidos.
      const getSettingCategoriesResponse = await axios.post(`${apiEndpoint}/setting/getSettingCategories`);
      response.json(getSettingCategoriesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir configurações (setting/setSetting)
  routes.post('/setting/setSetting', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir configurações (setting/setSetting).
      // Define configurações com base nos dados fornecidos.
      const setSettingResponse = await axios.post(`${apiEndpoint}/setting/setSetting`, data);
      response.json(setSettingResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter contas sociais (setting/getSocialAccounts)
  routes.post('/setting/getSocialAccounts', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter contas sociais (setting/getSocialAccounts).
      // Obtém contas sociais com base nos parâmetros fornecidos.
      const getSocialAccountsResponse = await axios.post(`${apiEndpoint}/setting/getSocialAccounts`);
      response.json(getSocialAccountsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter campos de endereço (setting/getAddressFields)
  routes.post('/setting/getAddressFields', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter campos de endereço (setting/getAddressFields).
      // Obtém campos de endereço com base nos parâmetros fornecidos.
      const getAddressFieldsResponse = await axios.post(`${apiEndpoint}/setting/getAddressFields`);
      response.json(getAddressFieldsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir cache (setting/deleteCache/{Type})
  routes.post('/setting/deleteCache/:Type', async (request: Request, response: Response) => {
    try {
      const { Type, ProductIds, ProductCodes, Url } = request.body;

      // Implemente a lógica para excluir cache (setting/deleteCache/{Type}).
      // Exclui o cache com base nos parâmetros fornecidos.
      const deleteCacheResponse = await axios.post(`${apiEndpoint}/setting/deleteCache/${Type}`, { ProductIds, ProductCodes, Url });
      response.json(deleteCacheResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter idiomas (setting/getLanguages)
  routes.post('/setting/getLanguages', async (request: Request, response: Response) => {
    try {
      const { language } = request.body;

      // Implemente a lógica para obter idiomas (setting/getLanguages).
      // Obtém idiomas com base nos parâmetros fornecidos.
      const getLanguagesResponse = await axios.post(`${apiEndpoint}/setting/getLanguages`, { language });
      response.json(getLanguagesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar código (setting/updateCode)
  routes.post('/setting/updateCode', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar código (setting/updateCode).
      // Atualiza códigos com base nos dados fornecidos.
      const updateCodeResponse = await axios.post(`${apiEndpoint}/setting/updateCode`, data);
      response.json(updateCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para adicionar imagem de arquivo para subproduto (subProduct/addImageFromFile/{ProductCode})
  routes.post('/subProduct/addImageFromFile/:ProductCode', async (request: Request, response: Response) => {
    try {
      const { ProductCode } = request.params;
      const { image, list_number, PropertyType, Property, ImageSizeWidthHeightControl } = request.body;

      // Implemente a lógica para adicionar imagem de arquivo para subproduto (subProduct/addImageFromFile/{ProductCode}).
      // Adiciona uma imagem de arquivo para o subproduto com base nos parâmetros fornecidos.
      const addImageFromFileResponse = await axios.post(`${apiEndpoint}/subProduct/addImageFromFile/${ProductCode}`, { image, list_number, PropertyType, Property, ImageSizeWidthHeightControl });
      response.json(addImageFromFileResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar imagem de link para subproduto (subProduct/addImageFromLink)
  routes.post('/subProduct/addImageFromLink', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para adicionar imagem de link para subproduto (subProduct/addImageFromLink).
      // Adiciona uma imagem de link para o subproduto com base nos parâmetros fornecidos.
      const addImageFromLinkResponse = await axios.post(`${apiEndpoint}/subProduct/addImageFromLink`, { data });
      response.json(addImageFromLinkResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar subprodutos (subProduct/addSubProducts)
  routes.post('/subProduct/addSubProducts', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para adicionar subprodutos (subProduct/addSubProducts).
      // Adiciona subprodutos com base nos dados fornecidos.
      const addSubProductsResponse = await axios.post(`${apiEndpoint}/subProduct/addSubProducts`, { data });
      response.json(addSubProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir subprodutos (subProduct/deleteSubProducts)
  routes.post('/subProduct/deleteSubProducts', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para excluir subprodutos (subProduct/deleteSubProducts).
      // Exclui subprodutos com base nos dados fornecidos.
      const deleteSubProductsResponse = await axios.post(`${apiEndpoint}/subProduct/deleteSubProducts`, { data });
      response.json(deleteSubProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter propriedades de subproduto (subProduct/getProperties)
  routes.post('/subProduct/getProperties', async (request: Request, response: Response) => {
    try {
      const { start, limit, Translation } = request.body;

      // Implemente a lógica para obter propriedades de subproduto (subProduct/getProperties).
      // Obtém propriedades de subproduto com base nos parâmetros fornecidos.
      const getPropertiesResponse = await axios.post(`${apiEndpoint}/subProduct/getProperties`, { start, limit, Translation });
      response.json(getPropertiesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir propriedades de subproduto (subProduct/setProperties)
  routes.post('/subProduct/setProperties', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir propriedades de subproduto (subProduct/setProperties).
      // Define propriedades de subproduto com base nos dados fornecidos.
      const setPropertiesResponse = await axios.post(`${apiEndpoint}/subProduct/setProperties`, { data });
      response.json(setPropertiesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir idiomas de propriedades de subproduto (subProduct/setPropertyLanguages)
  routes.post('/subProduct/setPropertyLanguages', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir idiomas de propriedades de subproduto (subProduct/setPropertyLanguages).
      // Define idiomas de propriedades de subproduto com base nos dados fornecidos.
      const setPropertyLanguagesResponse = await axios.post(`${apiEndpoint}/subProduct/setPropertyLanguages`, { data });
      response.json(setPropertyLanguagesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter grupos de propriedades de subproduto (subProduct/getPropertyGroups)
  routes.post('/subProduct/getPropertyGroups', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter grupos de propriedades de subproduto (subProduct/getPropertyGroups).
      // Obtém grupos de propriedades de subproduto.
      const getPropertyGroupsResponse = await axios.post(`${apiEndpoint}/subProduct/getPropertyGroups`);
      response.json(getPropertyGroupsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir grupos de propriedades de subproduto (subProduct/setPropertyGroups)
  routes.post('/subProduct/setPropertyGroups', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir grupos de propriedades de subproduto (subProduct/setPropertyGroups).
      // Define grupos de propriedades de subproduto com base nos dados fornecidos.
      const setPropertyGroupsResponse = await axios.post(`${apiEndpoint}/subProduct/setPropertyGroups`, { data });
      response.json(setPropertyGroupsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter subproduto por código (subProduct/getSubProductByCode/{SubProductCode})
  routes.post('/subProduct/getSubProductByCode/:SubProductCode', async (request: Request, response: Response) => {
    try {
      const { SubProductCode } = request.params;
      const { single, FetchDiscountedPrice } = request.body;

      // Implemente a lógica para obter subproduto por código (subProduct/getSubProductByCode/{SubProductCode}).
      // Obtém subproduto com base no código fornecido.
      const getSubProductByCodeResponse = await axios.post(`${apiEndpoint}/subProduct/getSubProductByCode/${SubProductCode}`, { single, FetchDiscountedPrice });
      response.json(getSubProductByCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter subproduto por ID (subProduct/getSubProductById/{SubProductId})
  routes.post('/subProduct/getSubProductById/:SubProductId', async (request: Request, response: Response) => {
    try {
      const { SubProductId } = request.params;
      const { single, FetchDiscountedPrice } = request.body;

      // Implemente a lógica para obter subproduto por ID (subProduct/getSubProductById/{SubProductId}).
      // Obtém subproduto com base no ID fornecido.
      const getSubProductByIdResponse = await axios.post(`${apiEndpoint}/subProduct/getSubProductById/${SubProductId}`, { single, FetchDiscountedPrice });
      response.json(getSubProductByIdResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter subprodutos (subProduct/getSubProducts)
  routes.post('/subProduct/getSubProducts', async (request: Request, response: Response) => {
    try {
      const { CustomerGroupCode, start, limit, columns, f, f2, orderby, FetchPriceWithComma, FetchDiscountedPrice, FetchGroupInfo, FetchAdditionalInfo } = request.body;

      // Implemente a lógica para obter subprodutos (subProduct/getSubProducts).
      // Obtém subprodutos com base nos parâmetros fornecidos.
      const getSubProductsResponse = await axios.post(`${apiEndpoint}/subProduct/getSubProducts`, { CustomerGroupCode, start, limit, columns, f, f2, orderby, FetchPriceWithComma, FetchDiscountedPrice, FetchGroupInfo, FetchAdditionalInfo });
      response.json(getSubProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter subprodutos por código do pai (subProduct/getSubProductsByParentCode/{ParentCode})
  routes.post('/subProduct/getSubProductsByParentCode/:ParentCode', async (request: Request, response: Response) => {
    try {
      const { ParentCode } = request.params;
      const { orderby, Detay, FetchDiscountedPrice } = request.body;

      // Implemente a lógica para obter subprodutos por código do pai (subProduct/getSubProductsByParentCode/{ParentCode}).
      // Obtém subprodutos com base no código do pai fornecido e nos parâmetros adicionais.
      const getSubProductsByParentCodeResponse = await axios.post(`${apiEndpoint}/subProduct/getSubProductsByParentCode/${ParentCode}`, { orderby, Detay, FetchDiscountedPrice });
      response.json(getSubProductsByParentCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter subprodutos por ID do pai (subProduct/getSubProductsByParentId/{ParentId})
  routes.post('/subProduct/getSubProductsByParentId/:ParentId', async (request: Request, response: Response) => {
    try {
      const { ParentId } = request.params;
      const { orderby, Detay, CustomerGroupCode } = request.body;

      // Implemente a lógica para obter subprodutos por ID do pai (subProduct/getSubProductsByParentId/{ParentId}).
      // Obtém subprodutos com base no ID do pai fornecido e nos parâmetros adicionais.
      const getSubProductsByParentIdResponse = await axios.post(`${apiEndpoint}/subProduct/getSubProductsByParentId/${ParentId}`, { orderby, Detay, CustomerGroupCode });
      response.json(getSubProductsByParentIdResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir subprodutos (subProduct/setSubProducts)
  routes.post('/subProduct/setSubProducts', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir subprodutos (subProduct/setSubProducts).
      // Define subprodutos com base nos dados fornecidos.
      const setSubProductsResponse = await axios.post(`${apiEndpoint}/subProduct/setSubProducts`, { data });
      response.json(setSubProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar subprodutos (subProduct/updateSubProducts)
  routes.post('/subProduct/updateSubProducts', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar subprodutos (subProduct/updateSubProducts).
      // Atualiza subprodutos com base nos dados fornecidos.
      const updateSubProductsResponse = await axios.post(`${apiEndpoint}/subProduct/updateSubProducts`, { data });
      response.json(updateSubProductsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar estoque de subprodutos (subProduct/updateStock)
  routes.post('/subProduct/updateStock', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar estoque de subprodutos (subProduct/updateStock).
      // Atualiza o estoque de subprodutos com base nos dados fornecidos.
      const updateStockResponse = await axios.post(`${apiEndpoint}/subProduct/updateStock`, { data });
      response.json(updateStockResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar estoque de subprodutos por código do fornecedor (subProduct/updateStockBySupplierCode)
  routes.post('/subProduct/updateStockBySupplierCode', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar estoque de subprodutos por código do fornecedor (subProduct/updateStockBySupplierCode).
      // Atualiza o estoque de subprodutos com base nos dados fornecidos.
      const updateStockBySupplierCodeResponse = await axios.post(`${apiEndpoint}/subProduct/updateStockBySupplierCode`, { data });
      response.json(updateStockBySupplierCodeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar preço de subprodutos (subProduct/updatePrice)
  routes.post('/subProduct/updatePrice', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar preço de subprodutos (subProduct/updatePrice).
      // Atualiza o preço de subprodutos com base nos dados fornecidos.
      const updatePriceResponse = await axios.post(`${apiEndpoint}/subProduct/updatePrice`, { data });
      response.json(updatePriceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar estoque e preço de subprodutos (subProduct/updateStockAndPrice)
  routes.post('/subProduct/updateStockAndPrice', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar estoque e preço de subprodutos (subProduct/updateStockAndPrice).
      // Atualiza o estoque e o preço de subprodutos com base nos dados fornecidos.
      const updateStockAndPriceResponse = await axios.post(`${apiEndpoint}/subProduct/updateStockAndPrice`, { data });
      response.json(updateStockAndPriceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para excluir a capa da loja (supplier/deleteStoreCover/{StoreId})
  routes.delete('/supplier/deleteStoreCover/:StoreId', async (request: Request, response: Response) => {
    try {
      const { StoreId } = request.params;

      // Implemente a lógica para excluir a capa da loja (supplier/deleteStoreCover/{StoreId}).
      // Exclui a capa da loja com base no ID da loja fornecido.
      const deleteStoreCoverResponse = await axios.delete(`${apiEndpoint}/supplier/deleteStoreCover/${StoreId}`);
      response.json(deleteStoreCoverResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir o logotipo da loja (supplier/deleteStoreLogo/{StoreId})
  routes.delete('/supplier/deleteStoreLogo/:StoreId', async (request: Request, response: Response) => {
    try {
      const { StoreId } = request.params;

      // Implemente a lógica para excluir o logotipo da loja (supplier/deleteStoreLogo/{StoreId}).
      // Exclui o logotipo da loja com base no ID da loja fornecido.
      const deleteStoreLogoResponse = await axios.delete(`${apiEndpoint}/supplier/deleteStoreLogo/${StoreId}`);
      response.json(deleteStoreLogoResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter eSuppliers (supplier/getESuppliers)
  routes.post('/supplier/getESuppliers', async (request: Request, response: Response) => {
    try {
      const { start, limit, columns, Detay, Detay2, orderby } = request.body;

      // Implemente a lógica para obter eSuppliers (supplier/getESuppliers).
      // Obtém eSuppliers com base nos parâmetros fornecidos.
      const getESuppliersResponse = await axios.post(`${apiEndpoint}/supplier/getESuppliers`, { start, limit, columns, Detay, Detay2, orderby });
      response.json(getESuppliersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter fornecedores (supplier/getSuppliers)
  routes.post('/supplier/getSuppliers', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para obter fornecedores (supplier/getSuppliers).
      // Obtém fornecedores com base nos parâmetros fornecidos.
      const getSuppliersResponse = await axios.post(`${apiEndpoint}/supplier/getSuppliers`);
      response.json(getSuppliersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter fornecedor por ID (supplier/getSupplierById/{SupplierId})
  routes.post('/supplier/getSupplierById/:SupplierId', async (request: Request, response: Response) => {
    try {
      const { SupplierId } = request.params;

      // Implemente a lógica para obter fornecedor por ID (supplier/getSupplierById/{SupplierId}).
      // Obtém fornecedor com base no ID fornecido.
      const getSupplierByIdResponse = await axios.post(`${apiEndpoint}/supplier/getSupplierById/${SupplierId}`);
      response.json(getSupplierByIdResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar a capa da loja (supplier/updateStoreCover/{StoreId})
  routes.post('/supplier/updateStoreCover/:StoreId', async (request: Request, response: Response) => {
    try {
      const { StoreId } = request.params;
      const { desc, image } = request.body;

      // Implemente a lógica para atualizar a capa da loja (supplier/updateStoreCover/{StoreId}).
      // Atualiza a capa da loja com base no ID da loja e nos dados fornecidos.
      const updateStoreCoverResponse = await axios.post(`${apiEndpoint}/supplier/updateStoreCover/${StoreId}`, { desc, image });
      response.json(updateStoreCoverResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar o logotipo da loja (supplier/updateStoreLogo/{StoreId})
  routes.post('/supplier/updateStoreLogo/:StoreId', async (request: Request, response: Response) => {
    try {
      const { StoreId } = request.params;
      const { image } = request.body;

      // Implemente a lógica para atualizar o logotipo da loja (supplier/updateStoreLogo/{StoreId}).
      // Atualiza o logotipo da loja com base no ID da loja e nos dados fornecidos.
      const updateStoreLogoResponse = await axios.post(`${apiEndpoint}/supplier/updateStoreLogo/${StoreId}`, { image });
      response.json(updateStoreLogoResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar o nome da loja (supplier/updateStoreName)
  routes.post('/supplier/updateStoreName', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar o nome da loja (supplier/updateStoreName).
      // Atualiza o nome da loja com base nos dados fornecidos.
      const updateStoreNameResponse = await axios.post(`${apiEndpoint}/supplier/updateStoreName`, { data });
      response.json(updateStoreNameResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar fornecedor (supplier/updateSupplier)
  routes.post('/supplier/updateSupplier', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para atualizar fornecedor (supplier/updateSupplier).
      // Atualiza fornecedor com base nos dados fornecidos.
      const updateSupplierResponse = await axios.post(`${apiEndpoint}/supplier/updateSupplier`, { data });
      response.json(updateSupplierResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir fornecedor (supplier/setSupplier)
  routes.post('/supplier/setSupplier', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir fornecedor (supplier/setSupplier).
      // Define fornecedor com base nos dados fornecidos.
      const setSupplierResponse = await axios.post(`${apiEndpoint}/supplier/setSupplier`, { data });
      response.json(setSupplierResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  routes.post('/user/getPanelAdmins', async (request: Request, response: Response) => {
    try {
      const { start, limit, columns, Detay, Detay2, orderby } = request.body;

      // Implemente a lógica para obter administradores do painel (user/getPanelAdmins).
      // Obtém administradores do painel com base nos parâmetros fornecidos.
      const getPanelAdminsResponse = await axios.post(`${apiEndpoint}/user/getPanelAdmins`, { start, limit, columns, Detay, Detay2, orderby });
      response.json(getPanelAdminsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter usuários (user/getUsers)
  routes.post('/user/getUsers', async (request: Request, response: Response) => {
    try {
      const { start, limit, columns, Detay, Detay2, orderby } = request.body;

      // Implemente a lógica para obter usuários (user/getUsers).
      // Obtém usuários com base nos parâmetros fornecidos.
      const getUsersResponse = await axios.post(`${apiEndpoint}/user/getUsers`, { start, limit, columns, Detay, Detay2, orderby });
      response.json(getUsersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter administrador do painel por senha (user/getPanelAdminByPassword)
  routes.post('/user/getPanelAdminByPassword', async (request: Request, response: Response) => {
    try {
      const { user, pass } = request.body;

      // Implemente a lógica para obter administrador do painel por senha (user/getPanelAdminByPassword).
      // Obtém administrador do painel com base no nome de usuário e senha fornecidos.
      const getPanelAdminByPasswordResponse = await axios.post(`${apiEndpoint}/user/getPanelAdminByPassword`, { user, pass });
      response.json(getPanelAdminByPasswordResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para fazer login como administrador do painel (user/loginAsPanelAdmin)
  routes.post('/user/loginAsPanelAdmin', async (request: Request, response: Response) => {
    try {
      const { AdminId, AdminCode, RedirectUrl, TopFrameUrl } = request.body;

      // Implemente a lógica para fazer login como administrador do painel (user/loginAsPanelAdmin).
      // Faz login como administrador do painel com base nos dados fornecidos.
      const loginAsPanelAdminResponse = await axios.post(`${apiEndpoint}/user/loginAsPanelAdmin`, { AdminId, AdminCode, RedirectUrl, TopFrameUrl });
      response.json(loginAsPanelAdminResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir dispositivo de administrador (user/setAdminDevice)
  routes.post('/user/setAdminDevice', async (request: Request, response: Response) => {
    try {
      const { device_id, registration_id, admin_id, platform, language, notification_settings } = request.body;

      // Implemente a lógica para definir dispositivo de administrador (user/setAdminDevice).
      // Define dispositivo de administrador com base nos dados fornecidos.
      const setAdminDeviceResponse = await axios.post(`${apiEndpoint}/user/setAdminDevice`, { device_id, registration_id, admin_id, platform, language, notification_settings });
      response.json(setAdminDeviceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter dispositivos de administrador (user/getAdminDevices)
  routes.post('/user/getAdminDevices', async (request: Request, response: Response) => {
    try {
      const { device_id } = request.body;

      // Implemente a lógica para obter dispositivos de administrador (user/getAdminDevices).
      // Obtém dispositivos de administrador com base nos parâmetros fornecidos.
      const getAdminDevicesResponse = await axios.post(`${apiEndpoint}/user/getAdminDevices`, { device_id });
      response.json(getAdminDevicesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir dispositivo de administrador (user/deleteAdminDevice)
  routes.post('/user/deleteAdminDevice', async (request: Request, response: Response) => {
    try {
      const { device_id } = request.body;

      // Implemente a lógica para excluir dispositivo de administrador (user/deleteAdminDevice).
      // Exclui dispositivo de administrador com base no ID do dispositivo fornecido.
      const deleteAdminDeviceResponse = await axios.post(`${apiEndpoint}/user/deleteAdminDevice`, { device_id });
      response.json(deleteAdminDeviceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter tickets (ticket/getTickets)
  routes.post('/ticket/getTickets', async (request: Request, response: Response) => {
    try {
      const { start, limit, columns, Detay, Detay2, orderby } = request.body;

      // Implemente a lógica para obter tickets (ticket/getTickets).
      // Obtém tickets com base nos parâmetros fornecidos.
      const getTicketsResponse = await axios.post(`${apiEndpoint}/ticket/getTickets`, { start, limit, columns, Detay, Detay2, orderby });
      response.json(getTicketsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter detalhes do ticket (ticket/getTicketDetails/{TicketId})
  routes.post('/ticket/getTicketDetails/:TicketId', async (request: Request, response: Response) => {
    try {
      const { TicketId } = request.params;
      const { FetchNameData } = request.body;

      // Implemente a lógica para obter detalhes do ticket (ticket/getTicketDetails/{TicketId}).
      // Obtém detalhes do ticket com base no ID do ticket fornecido.
      const getTicketDetailsResponse = await axios.post(`${apiEndpoint}/ticket/getTicketDetails/${TicketId}`, { FetchNameData });
      response.json(getTicketDetailsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para responder a um ticket (ticket/reply)
  routes.post('/ticket/reply', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para responder a um ticket (ticket/reply).
      // Responde a um ticket com base nos dados fornecidos.
      const replyTicketResponse = await axios.post(`${apiEndpoint}/ticket/reply`, { data });
      response.json(replyTicketResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para enviar uma nova mensagem (ticket/sendNewMessage)
  routes.post('/ticket/sendNewMessage', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para enviar uma nova mensagem (ticket/sendNewMessage).
      // Envia uma nova mensagem para um ticket com base nos dados fornecidos.
      const sendNewMessageResponse = await axios.post(`${apiEndpoint}/ticket/sendNewMessage`, { data });
      response.json(sendNewMessageResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter pontos (point/get)
  routes.post('/point/get', async (request: Request, response: Response) => {
    try {
      const { limit, start, Detay, Detay2 } = request.body;

      // Implemente a lógica para obter pontos (point/get).
      // Obtém pontos com base nos parâmetros fornecidos.
      const getPointResponse = await axios.post(`${apiEndpoint}/point/get`, { limit, start, Detay, Detay2 });
      response.json(getPointResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir pontos (point/set)
  routes.post('/point/set', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir pontos (point/set).
      // Define pontos com base nos dados fornecidos.
      const setPointResponse = await axios.post(`${apiEndpoint}/point/set`, { data });
      response.json(setPointResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter categoria de vitrine (showcase/getCategory/{version})
  routes.post('/showcase/getCategory/:version', async (request: Request, response: Response) => {
    try {
      const { version, limit, start, Detay, Detay2 } = request.body;

      // Implemente a lógica para obter categoria de vitrine (showcase/getCategory/{version}).
      // Obtém categoria de vitrine com base nos parâmetros fornecidos.
      const getShowcaseCategoryResponse = await axios.post(`${apiEndpoint}/showcase/getCategory/${version}`, { limit, start, Detay, Detay2 });
      response.json(getShowcaseCategoryResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter vitrine (showcase/get/{version})
  routes.post('/showcase/get/:version', async (request: Request, response: Response) => {
    try {
      const { version, limit, start, Detay, Detay2 } = request.body;

      // Implemente a lógica para obter vitrine (showcase/get/{version}).
      // Obtém vitrine com base nos parâmetros fornecidos.
      const getShowcaseResponse = await axios.post(`${apiEndpoint}/showcase/get/${version}`, { limit, start, Detay, Detay2 });
      response.json(getShowcaseResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para enviar para Heap (adapter/sendheap)
  routes.post('/adapter/sendheap', async (request: Request, response: Response) => {
    try {
      const { SendheapApiUsername, SendheapApiPassword, data } = request.body;

      // Implemente a lógica para enviar para Heap (adapter/sendheap).
      // Envia dados para Heap com base nos parâmetros fornecidos.
      const sendHeapResponse = await axios.post(`${apiEndpoint}/adapter/sendheap`, { SendheapApiUsername, SendheapApiPassword, data });
      response.json(sendHeapResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para Nildesk (adapter/nildesk)
  routes.post('/adapter/nildesk', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para Nildesk (adapter/nildesk).
      // Integração com Nildesk com base nos dados fornecidos.
      const nildeskResponse = await axios.post(`${apiEndpoint}/adapter/nildesk`, { data });
      response.json(nildeskResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para fazer login no Hopi (hopi/signin)
  routes.post('/hopi/signin', async (request: Request, response: Response) => {
    try {
      const { HopiToken, BearerToken } = request.body;

      // Implemente a lógica para fazer login no Hopi (hopi/signin).
      // Faz login no Hopi com base nos tokens fornecidos.
      const hopiSigninResponse = await axios.post(`${apiEndpoint}/hopi/signin`, { HopiToken, BearerToken });
      response.json(hopiSigninResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir campanha no Hopi (hopi/setCampaign)
  routes.post('/hopi/setCampaign', async (request: Request, response: Response) => {
    try {
      const { Coin, Campaign } = request.body;

      // Implemente a lógica para definir campanha no Hopi (hopi/setCampaign).
      // Define campanha no Hopi com base nos dados fornecidos.
      const hopiSetCampaignResponse = await axios.post(`${apiEndpoint}/hopi/setCampaign`, { Coin, Campaign });
      response.json(hopiSetCampaignResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para remover campanha no Hopi (hopi/removeCampaign)
  routes.post('/hopi/removeCampaign', async (request: Request, response: Response) => {
    try {
      // Implemente a lógica para remover campanha no Hopi (hopi/removeCampaign).
      // Remove a campanha no Hopi.
      const hopiRemoveCampaignResponse = await axios.post(`${apiEndpoint}/hopi/removeCampaign`);
      response.json(hopiRemoveCampaignResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter notícias (news/getNews)
  routes.post('/news/getNews', async (request: Request, response: Response) => {
    try {
      const { limit, start, Detay, Detay2 } = request.body;

      // Implemente a lógica para obter notícias (news/getNews).
      // Obtém notícias com base nos parâmetros fornecidos.
      const getNewsResponse = await axios.post(`${apiEndpoint}/news/getNews`, { limit, start, Detay, Detay2 });
      response.json(getNewsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir notícias (news/setNews)
  routes.post('/news/setNews', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir notícias (news/setNews).
      // Define notícias com base nos dados fornecidos.
      const setNewsResponse = await axios.post(`${apiEndpoint}/news/setNews`, { data });
      response.json(setNewsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
 // Rota para fazer login na plataforma (platform/login)
 routes.post('/platform/login', async (request: Request, response: Response) => {
    try {
      const { Email, Platform, Phone, Password, CustomerHash } = request.body;

      // Implemente a lógica para fazer login na plataforma (platform/login).
      // Faz login na plataforma com base nos dados fornecidos.
      const platformLoginResponse = await axios.post(`${apiEndpoint}/platform/login`, { Email, Platform, Phone, Password, CustomerHash });
      response.json(platformLoginResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para login social na plataforma (platform/socialLogin)
  routes.post('/platform/socialLogin', async (request: Request, response: Response) => {
    try {
      const { Platform, SocialPlatform, data } = request.body;

      // Implemente a lógica para login social na plataforma (platform/socialLogin).
      // Faz login social na plataforma com base nos dados fornecidos.
      const socialLoginResponse = await axios.post(`${apiEndpoint}/platform/socialLogin`, { Platform, SocialPlatform, data });
      response.json(socialLoginResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para conectar o Linker na plataforma (platform/connectLinker)
  routes.post('/platform/connectLinker', async (request: Request, response: Response) => {
    try {
      const { Platform, CustomerHash, RedirectUrl } = request.body;

      // Implemente a lógica para conectar o Linker na plataforma (platform/connectLinker).
      // Conecta o Linker na plataforma com base nos dados fornecidos.
      const connectLinkerResponse = await axios.post(`${apiEndpoint}/platform/connectLinker`, { Platform, CustomerHash, RedirectUrl });
      response.json(connectLinkerResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para enviar imagem de personalização na plataforma (platform/personalizationSendImage)
  routes.post('/platform/personalizationSendImage', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, Image, ProductId } = request.body;

      // Implemente a lógica para enviar imagem de personalização na plataforma (platform/personalizationSendImage).
      // Envia imagem de personalização na plataforma com base nos dados fornecidos.
      const personalizationSendImageResponse = await axios.post(`${apiEndpoint}/platform/personalizationSendImage`, { CustomerHash, Platform, Image, ProductId });
      response.json(personalizationSendImageResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para reordenar na plataforma (platform/reorder)
  routes.post('/platform/reorder', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, OrderId } = request.body;

      // Implemente a lógica para reordenar na plataforma (platform/reorder).
      // Reordena na plataforma com base nos dados fornecidos.
      const reorderResponse = await axios.post(`${apiEndpoint}/platform/reorder`, { CustomerHash, Platform, OrderId });
      response.json(reorderResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter informações do cliente na plataforma (platform/getCustomer)
  routes.post('/platform/getCustomer', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform } = request.body;

      // Implemente a lógica para obter informações do cliente na plataforma (platform/getCustomer).
      // Obtém informações do cliente na plataforma com base nos dados fornecidos.
      const getCustomerResponse = await axios.post(`${apiEndpoint}/platform/getCustomer`, { CustomerHash, Platform });
      response.json(getCustomerResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter pedidos na plataforma (platform/getOrders)
  routes.post('/platform/getOrders', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, FetchProductData, FetchProductDetail, FetchProductAdditionalData, FetchPackageContent, FetchCustomerData, FetchInvoiceAddress, FetchDeliveryAddress, FetchCampaignData, FetchOrderContract, FetchCargoDetail, FetchShipmentDetail, FetchDeleteds } = request.body;

      // Implemente a lógica para obter pedidos na plataforma (platform/getOrders).
      // Obtém pedidos na plataforma com base nos dados fornecidos.
      const getOrdersResponse = await axios.post(`${apiEndpoint}/platform/getOrders`, { CustomerHash, Platform, FetchProductData, FetchProductDetail, FetchProductAdditionalData, FetchPackageContent, FetchCustomerData, FetchInvoiceAddress, FetchDeliveryAddress, FetchCampaignData, FetchOrderContract, FetchCargoDetail, FetchShipmentDetail, FetchDeleteds });
      response.json(getOrdersResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir cliente na plataforma (platform/deleteCustomer)
  routes.post('/platform/deleteCustomer', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform } = request.body;

      // Implemente a lógica para excluir cliente na plataforma (platform/deleteCustomer).
      // Exclui cliente na plataforma com base nos dados fornecidos.
      const deleteCustomerResponse = await axios.post(`${apiEndpoint}/platform/deleteCustomer`, { CustomerHash, Platform });
      response.json(deleteCustomerResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir cliente na plataforma (platform/setCustomer)
  routes.post('/platform/setCustomer', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, data } = request.body;

      // Implemente a lógica para definir cliente na plataforma (platform/setCustomer).
      // Define cliente na plataforma com base nos dados fornecidos.
      const setCustomerResponse = await axios.post(`${apiEndpoint}/platform/setCustomer`, { CustomerHash, Platform, data });
      response.json(setCustomerResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para definir widget (widget/set)
  routes.post('/widget/set', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir widget (widget/set).
      // Define widget com base nos dados fornecidos.
      const setWidgetResponse = await axios.post(`${apiEndpoint}/widget/set`, { data });
      response.json(setWidgetResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir widget (widget/delete/{prefix})
  routes.delete('/widget/delete/:prefix', async (request: Request, response: Response) => {
    try {
      const { prefix } = request.params;

      // Implemente a lógica para excluir widget (widget/delete/{prefix}).
      // Exclui widget com base no prefixo fornecido.
      const deleteWidgetResponse = await axios.delete(`${apiEndpoint}/widget/delete/${prefix}`);
      response.json(deleteWidgetResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para definir log de envio (cargo/setShipmentLog)
  routes.post('/cargo/setShipmentLog', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir log de envio (cargo/setShipmentLog).
      // Define log de envio com base nos dados fornecidos.
      const setShipmentLogResponse = await axios.post(`${apiEndpoint}/cargo/setShipmentLog`, { data });
      response.json(setShipmentLogResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter endereço (platform/getAddress)
  routes.post('/platform/getAddress', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, Page } = request.body;

      // Implemente a lógica para obter endereço (platform/getAddress).
      // Obtém endereço com base nos dados fornecidos.
      const getAddressResponse = await axios.post(`${apiEndpoint}/platform/getAddress`, { CustomerHash, Platform, Page });
      response.json(getAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter lista de alarmes (platform/getAlarmList)
  routes.post('/platform/getAlarmList', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, ProductId, SubProductId, AlarmType, start, limit, orderby, FetchProductData } = request.body;

      // Implemente a lógica para obter lista de alarmes (platform/getAlarmList).
      // Obtém lista de alarmes com base nos dados fornecidos.
      const getAlarmListResponse = await axios.post(`${apiEndpoint}/platform/getAlarmList`, { CustomerHash, Platform, ProductId, SubProductId, AlarmType, start, limit, orderby, FetchProductData });
      response.json(getAlarmListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar alarme (platform/addAlarm)
  routes.post('/platform/addAlarm', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, ProductId, SubProductId, AlarmType, AlarmDay, CurrentPrice, AlarmPrice, Currency, VatIncluded, StockLimit } = request.body;

      // Implemente a lógica para adicionar alarme (platform/addAlarm).
      // Adiciona alarme com base nos dados fornecidos.
      const addAlarmResponse = await axios.post(`${apiEndpoint}/platform/addAlarm`, { CustomerHash, Platform, ProductId, SubProductId, AlarmType, AlarmDay, CurrentPrice, AlarmPrice, Currency, VatIncluded, StockLimit });
      response.json(addAlarmResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir alarme (platform/deleteAlarm)
  routes.post('/platform/deleteAlarm', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, AlarmId } = request.body;

      // Implemente a lógica para excluir alarme (platform/deleteAlarm).
      // Exclui alarme com base nos dados fornecidos.
      const deleteAlarmResponse = await axios.post(`${apiEndpoint}/platform/deleteAlarm`, { CustomerHash, Platform, AlarmId });
      response.json(deleteAlarmResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para obter lista de favoritos (platform/getFavoriteList)
  routes.post('/platform/getFavoriteList', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform } = request.body;

      // Implemente a lógica para obter lista de favoritos (platform/getFavoriteList).
      // Obtém lista de favoritos com base nos dados fornecidos.
      const getFavoriteListResponse = await axios.post(`${apiEndpoint}/platform/getFavoriteList`, { CustomerHash, Platform });
      response.json(getFavoriteListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar à lista de favoritos (platform/addToFavoriteList)
  routes.post('/platform/addToFavoriteList', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, ProductId, SubProductId } = request.body;

      // Implemente a lógica para adicionar à lista de favoritos (platform/addToFavoriteList).
      // Adiciona à lista de favoritos com base nos dados fornecidos.
      const addToFavoriteListResponse = await axios.post(`${apiEndpoint}/platform/addToFavoriteList`, { CustomerHash, Platform, ProductId, SubProductId });
      response.json(addToFavoriteListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir da lista de favoritos (platform/deleteFromFavoriteList)
  routes.post('/platform/deleteFromFavoriteList', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, ProductId, SubProductId } = request.body;

      // Implemente a lógica para excluir da lista de favoritos (platform/deleteFromFavoriteList).
      // Exclui da lista de favoritos com base nos dados fornecidos.
      const deleteFromFavoriteListResponse = await axios.post(`${apiEndpoint}/platform/deleteFromFavoriteList`, { CustomerHash, Platform, ProductId, SubProductId });
      response.json(deleteFromFavoriteListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para definir endereço (platform/setAddress)
  routes.post('/platform/setAddress', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, data } = request.body;

      // Implemente a lógica para definir endereço (platform/setAddress).
      // Define o endereço com base nos dados fornecidos.
      const setAddressResponse = await axios.post(`${apiEndpoint}/platform/setAddress`, { CustomerHash, Platform, data });
      response.json(setAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir endereço de pedido (platform/setOrderAddress)
  routes.post('/platform/setOrderAddress', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, data } = request.body;

      // Implemente a lógica para definir endereço de pedido (platform/setOrderAddress).
      // Define o endereço de pedido com base nos dados fornecidos.
      const setOrderAddressResponse = await axios.post(`${apiEndpoint}/platform/setOrderAddress`, { CustomerHash, Platform, data });
      response.json(setOrderAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir endereço (platform/deleteAddress)
  routes.delete('/platform/deleteAddress/:AddressId', async (request: Request, response: Response) => {
    try {
      const { AddressId, CustomerHash, Platform } = request.params;

      // Implemente a lógica para excluir endereço (platform/deleteAddress).
      // Exclui o endereço com base nos dados fornecidos.
      const deleteAddressResponse = await axios.delete(`${apiEndpoint}/platform/deleteAddress/${AddressId}`, { data: { CustomerHash, Platform } });
      response.json(deleteAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter retorno de pedido (platform/getOrderReturn)
  routes.post('/platform/getOrderReturn/:OrderId', async (request: Request, response: Response) => {
    try {
      const { OrderId, CustomerHash, Platform, OrderCode } = request.params;

      // Implemente a lógica para obter retorno de pedido (platform/getOrderReturn).
      // Obtém o retorno de pedido com base nos dados fornecidos.
      const getOrderReturnResponse = await axios.post(`${apiEndpoint}/platform/getOrderReturn/${OrderId}`, { CustomerHash, Platform, OrderCode });
      response.json(getOrderReturnResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir retorno de pedido (platform/setOrderReturn)
  routes.post('/platform/setOrderReturn', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, data } = request.body;

      // Implemente a lógica para definir retorno de pedido (platform/setOrderReturn).
      // Define o retorno de pedido com base nos dados fornecidos.
      const setOrderReturnResponse = await axios.post(`${apiEndpoint}/platform/setOrderReturn`, { CustomerHash, Platform, data });
      response.json(setOrderReturnResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir localização (platform/setLocation)
  routes.post('/platform/setLocation', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, data } = request.body;

      // Implemente a lógica para definir localização (platform/setLocation).
      // Define a localização com base nos dados fornecidos.
      const setLocationResponse = await axios.post(`${apiEndpoint}/platform/setLocation`, { CustomerHash, Platform, data });
      response.json(setLocationResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter horários de entrega disponíveis (platform/availableDeliveryTimes)
  routes.post('/platform/availableDeliveryTimes', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform } = request.body;

      // Implemente a lógica para obter horários de entrega disponíveis (platform/availableDeliveryTimes).
      // Obtém horários de entrega disponíveis com base nos dados fornecidos.
      const availableDeliveryTimesResponse = await axios.post(`${apiEndpoint}/platform/availableDeliveryTimes`, { CustomerHash, Platform });
      response.json(availableDeliveryTimesResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir horário de entrega (platform/setDeliveryTime)
  routes.post('/platform/setDeliveryTime', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, Id, Date } = request.body;

      // Implemente a lógica para definir horário de entrega (platform/setDeliveryTime).
      // Define o horário de entrega com base nos dados fornecidos.
      const setDeliveryTimeResponse = await axios.post(`${apiEndpoint}/platform/setDeliveryTime`, { CustomerHash, Platform, Id, Date });
      response.json(setDeliveryTimeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter lista de cupons (platform/getCouponList)
  routes.post('/platform/getCouponList', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform } = request.body;

      // Implemente a lógica para obter lista de cupons (platform/getCouponList).
      // Obtém lista de cupons com base nos dados fornecidos.
      const getCouponListResponse = await axios.post(`${apiEndpoint}/platform/getCouponList`, { CustomerHash, Platform });
      response.json(getCouponListResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar ao carrinho (platform/addToCart)
  routes.post('/platform/addToCart', async (request: Request, response: Response) => {
    try {
      const { Platform, CustomerHash, data } = request.body;

      // Implemente a lógica para adicionar ao carrinho (platform/addToCart).
      // Adiciona ao carrinho com base nos dados fornecidos.
      const addToCartResponse = await axios.post(`${apiEndpoint}/platform/addToCart`, { Platform, CustomerHash, data });
      response.json(addToCartResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter carrinho (platform/getCart)
  routes.post('/platform/getCart', async (request: Request, response: Response) => {
    try {
      const { Platform, CustomerHash } = request.body;

      // Implemente a lógica para obter carrinho (platform/getCart).
      // Obtém carrinho com base nos dados fornecidos.
      const getCartResponse = await axios.post(`${apiEndpoint}/platform/getCart`, { Platform, CustomerHash });
      response.json(getCartResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para recomendar produto (platform/productRecommend)
  routes.post('/platform/productRecommend', async (request: Request, response: Response) => {
    try {
      const { CustomerHash, Platform, data } = request.body;

      // Implemente a lógica para recomendar produto (platform/productRecommend).
      // Recomenda um produto com base nos dados fornecidos.
      const productRecommendResponse = await axios.post(`${apiEndpoint}/platform/productRecommend`, { CustomerHash, Platform, data });
      response.json(productRecommendResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter endereços disponíveis (platform/getAvaliableAddress)
  routes.post('/platform/getAvaliableAddress', async (request: Request, response: Response) => {
    try {
      const { MobileToken, CustomerHash, Platform, CountryCode } = request.body;

      // Implemente a lógica para obter endereços disponíveis (platform/getAvaliableAddress).
      // Obtém endereços disponíveis com base nos dados fornecidos.
      const getAvaliableAddressResponse = await axios.post(`${apiEndpoint}/platform/getAvaliableAddress`, { MobileToken, CustomerHash, Platform, CountryCode });
      response.json(getAvaliableAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atualizar token (platform/refreshToken)
  routes.post('/platform/refreshToken', async (request: Request, response: Response) => {
    try {
      const { CustomerHash } = request.body;

      // Implemente a lógica para atualizar token (platform/refreshToken).
      // Atualiza o token com base nos dados fornecidos.
      const refreshTokenResponse = await axios.post(`${apiEndpoint}/platform/refreshToken`, { CustomerHash });
      response.json(refreshTokenResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter notificações (notification/getNotifications)
  routes.post('/notification/getNotifications', async (request: Request, response: Response) => {
    try {
      const { RegistrationId, DeviceId, Email, start, limit } = request.body;

      // Implemente a lógica para obter notificações (notification/getNotifications).
      // Obtém notificações com base nos dados fornecidos.
      const getNotificationsResponse = await axios.post(`${apiEndpoint}/notification/getNotifications`, { RegistrationId, DeviceId, Email, start, limit });
      response.json(getNotificationsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir notificações (notification/setNotifications)
  routes.post('/notification/setNotifications', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para definir notificações (notification/setNotifications).
      // Define notificações com base nos dados fornecidos.
      const setNotificationsResponse = await axios.post(`${apiEndpoint}/notification/setNotifications`, { data });
      response.json(setNotificationsResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para registrar dispositivo (notification/registerDevice)
  routes.post('/notification/registerDevice', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para registrar dispositivo (notification/registerDevice).
      // Registra o dispositivo com base nos dados fornecidos.
      const registerDeviceResponse = await axios.post(`${apiEndpoint}/notification/registerDevice`, { data });
      response.json(registerDeviceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir dispositivo (notification/deleteDevice)
  routes.delete('/notification/deleteDevice/:Id', async (request: Request, response: Response) => {
    try {
      const { Id, RegistrationId, Email } = request.params;

      // Implemente a lógica para excluir dispositivo (notification/deleteDevice).
      // Exclui o dispositivo com base nos dados fornecidos.
      const deleteDeviceResponse = await axios.delete(`${apiEndpoint}/notification/deleteDevice/${Id}`, { data: { RegistrationId, Email } });
      response.json(deleteDeviceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para desconectar cliente (notification/unConnectCustomer)
  routes.post('/notification/unConnectCustomer/:Email', async (request: Request, response: Response) => {
    try {
      const { Email } = request.params;

      // Implemente a lógica para desconectar cliente (notification/unConnectCustomer).
      // Desconecta o cliente com base nos dados fornecidos.
      const unConnectCustomerResponse = await axios.post(`${apiEndpoint}/notification/unConnectCustomer/${Email}`);
      response.json(unConnectCustomerResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para obter segmentos (segment/get)
  routes.post('/segment/get', async (request: Request, response: Response) => {
    try {
      const { start, limit } = request.body;

      // Implemente a lógica para obter segmentos (segment/get).
      // Obtém segmentos com base nos dados fornecidos.
      const getSegmentResponse = await axios.post(`${apiEndpoint}/segment/get`, { start, limit });
      response.json(getSegmentResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  // Rota para exibir segmento (segment/show/{id})
  routes.get('/segment/show/:id', async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      // Implemente a lógica para exibir o segmento (segment/show/{id}).
      // Obtém os detalhes do segmento com base no ID fornecido.
      const segmentShowResponse = await axios.get(`${apiEndpoint}/segment/show/${id}`);
      response.json(segmentShowResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para adicionar segmento (segment/add)
  routes.post('/segment/add', async (request: Request, response: Response) => {
    try {
      const { name } = request.body;

      // Implemente a lógica para adicionar o segmento (segment/add).
      // Adiciona um novo segmento com base no nome fornecido.
      const segmentAddResponse = await axios.post(`${apiEndpoint}/segment/add`, { name });
      response.json(segmentAddResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para definir segmento (segment/set/{id})
  routes.put('/segment/set/:id', async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { name } = request.body;

      // Implemente a lógica para definir o segmento (segment/set/{id}).
      // Define um segmento existente com base no ID e no novo nome fornecidos.
      const segmentSetResponse = await axios.put(`${apiEndpoint}/segment/set/${id}`, { id, name });
      response.json(segmentSetResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para excluir segmento (segment/delete/{id})
  routes.delete('/segment/delete/:id', async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      // Implemente a lógica para excluir o segmento (segment/delete/{id}).
      // Exclui um segmento com base no ID fornecido.
      const segmentDeleteResponse = await axios.delete(`${apiEndpoint}/segment/delete/${id}`);
      response.json(segmentDeleteResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para atribuir segmento (segment/assign/{id})
  routes.post('/segment/assign/:id', async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { SegmentIds } = request.body;

      // Implemente a lógica para atribuir segmento (segment/assign/{id}).
      // Atribui segmentos com base no ID e nos novos SegmentIds fornecidos.
      const segmentAssignResponse = await axios.post(`${apiEndpoint}/segment/assign/${id}`, { id, SegmentIds });
      response.json(segmentAssignResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para revogar segmento (segment/revoke/{id})
  routes.post('/segment/revoke/:id', async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { SegmentIds } = request.body;

      // Implemente a lógica para revogar segmento (segment/revoke/{id}).
      // Revoga segmentos com base no ID e nos SegmentIds fornecidos.
      const segmentRevokeResponse = await axios.post(`${apiEndpoint}/segment/revoke/${id}`, { id, SegmentIds });
      response.json(segmentRevokeResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para serviço de roteamento (routing/service)
  routes.post('/routing/service', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para o serviço de roteamento (routing/service).
      // Define configurações de serviço de roteamento com base nos dados fornecidos.
      const routingServiceResponse = await axios.post(`${apiEndpoint}/routing/service`, { data });
      response.json(routingServiceResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  // Rota para roteamento por endereço IP (routing/routingByIpAddress)
  routes.post('/routing/routingByIpAddress', async (request: Request, response: Response) => {
    try {
      const { data } = request.body;

      // Implemente a lógica para roteamento por endereço IP (routing/routingByIpAddress).
      // Define configurações de roteamento com base nos dados fornecidos.
      const routingByIpAddressResponse = await axios.post(`${apiEndpoint}/routing/routingByIpAddress`, { data });
      response.json(routingByIpAddressResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
};
