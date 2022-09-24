import server from "../src/app";
import supertest from 'supertest';
import { userFactory } from "./factories/user_factory";
import prisma from "../src/database/postgres";
import { userSigninFactory } from "./factories/user_signin_factory";
import { testFactory } from "./factories/test_factory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`;
  });

describe("Testa criação do usuário", () => {
    const user = userFactory();

    it("Retorna 201 caso o usuário seja criado", async () => {
        const result = await supertest(server).post("/signup").send(user);
        const status = result.status;
        expect(status).toEqual(201);
    });

    it("Retorna 422 caso o usuário esteja no formato inválido", async () => {
        user.email = "";
        const result = await supertest(server).post("/signup").send(user);
        const status = result.status;
        expect(status).toEqual(422);
    });
  
   
});

describe("Testa login do usuário", () => {
    const userSigin = userSigninFactory();
    const user = userFactory();
    it("Retorna 200 caso o usuário faça login", async () => {
        await supertest(server).post("/signup").send(user)
        const result = await supertest(server).post("/signin").send(userSigin);
        const status = result.status;
        expect(status).toEqual(200);
    });

    it("Retorna 401 caso o usuário não faça login", async () => {
        userSigin.email = "lululululu@email.com";
        const result = await supertest(server).post("/signin").send(userSigin);
        const status = result.status;
        expect(status).toEqual(401);
    });
  
  });

  describe("Testa criação de uma prova", () => {
    const test = testFactory();
    

    it("Retorna 201 caso a prova seja criada", async () => {
        const token = await getToken();
        console.log(token);
        const result = await supertest(server).post("/prova").set({ Authorization: `Bearer ${token}` }).send(test);
        const status = result.status;
        expect(status).toEqual(201);
    });

    it("Retorna 422 caso a prova esteja no formato inválido", async () => {
        const token = await getToken();
        test.pdfUrl = "a";
        const result = await supertest(server).post("/prova").set({ Authorization: `Bearer ${token}` }).send(test);
        const status = result.status;
        expect(status).toEqual(422);
    });

    it("Retorna 401 caso o token seja inválido", async () => {
        const token = "";
        const result = await supertest(server).post("/prova").set({ Authorization: `Bearer ${token}` }).send(test);
        const status = result.status;
        expect(status).toEqual(401);
    });
  
   
});

describe("Testa leitura de provas", () => {
    it("Retorna 200 caso a leitura seja feita com sucesso", async () => {
        const token = await getToken();
        const result = await supertest(server).get("/prova").set({ Authorization: `Bearer ${token}`, FilterBy: 'discipline'   });
        const status = result.status;
        expect(status).toEqual(200);
    });

    it("Retorna 401 caso o token esteja inválido", async () => {
        const token = "";
        const result = await supertest(server).get("/prova").set({ Authorization: `Bearer ${token}`, FilterBy: 'discipline'   });
        const status = result.status;
        expect(status).toEqual(401);
    });  

    it("Retorna 400 caso o header de tipo de agrupamento nao seja informado", async () => {
        const token = await getToken();
        const result = await supertest(server).get("/prova").set({ Authorization: `Bearer ${token}`});
        const status = result.status;
        expect(status).toEqual(400);
    }); 
});


  async function getToken() {
    await supertest(server).post("/signup").send(userFactory());
    const response = await supertest(server)
      .post("/signin")
      .send(userSigninFactory());

      const {token} = response.body;
    return token;
  }

  afterAll(async () => {
    await prisma.$disconnect();
  });