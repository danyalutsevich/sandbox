import { DataProvider, RaRecord } from "react-admin";

const hardcodedData: any = {
  users: [
    { id: "1", name: "John Doe", email: "johndoe@example.com" },
    { id: "2", name: "Jane Smith", email: "janesmith@example.com" },
  ],
  posts: [
    { id: "1", title: "First Post", content: "This is the first post content" },
    {
      id: "2",
      title: "Second Post",
      content: "This is the second post content",
    },
  ],
};

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    console.log("getList called", { resource, params });
    const data = hardcodedData[resource];
    return {
      data: data,
      total: data.length,
    };
  },

  getOne: async (resource, params) => {
    console.log("getOne called", { resource, params });
    const record = hardcodedData[resource].find(
      (item: RaRecord) => item.id === params.id,
    );
    return {
      data: record ? record : { id: params.id, name: "Not Found" },
    };
  },

  create: async (resource, params) => {
    console.log("create called", { resource, params });
    const newRecord = {
      ...params.data,
      id: `${hardcodedData[resource].length + 1}`,
    };
    hardcodedData[resource].push(newRecord);
    return { data: newRecord };
  },

  update: async (resource, params) => {
    console.log("update called", { resource, params });
    const index = hardcodedData[resource].findIndex(
      (item: RaRecord) => item.id === params.id,
    );
    if (index !== -1) {
      hardcodedData[resource][index] = {
        ...hardcodedData[resource][index],
        ...params.data,
      };
    }
    return { data: hardcodedData[resource][index] };
  },

  delete: async (resource, params) => {
    console.log("delete called", { resource, params });
    const index = hardcodedData[resource].findIndex(
      (item: RaRecord) => item.id === params.id,
    );
    if (index !== -1) {
      const deletedRecord = hardcodedData[resource].splice(index, 1)[0];
      return { data: deletedRecord };
    }
    return { data: { id: params.id } };
  },

  // Other methods like getMany, getManyReference, updateMany, deleteMany can be implemented similarly if needed
};

export default dataProvider;
