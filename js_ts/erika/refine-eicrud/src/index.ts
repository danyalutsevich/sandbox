import { BaseRecord, DataProvider } from "@refinedev/core";
// import { SuperClient } from "../../erika/eicrud_exports/super_client";

export type SuperClient = any;

export const dataProvider = (sp: SuperClient): DataProvider => ({
  getOne: async ({ resource, id, meta }) => {
    const res = await sp[resource as keyof SuperClient].findOne({
      id: id as string,
    });

    console.log({ res });

    return {
      data: res,
    };
  },

  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const res = await sp[resource as keyof SuperClient].find(
      {
        // ...pagination,
        // ...sorters,
        // ...filters,
      },
      {
        limit: pagination?.pageSize,
        offset: (pagination?.current || 1) * (pagination?.pageSize || 10),
      },
    );

    return {
      data: res.data as any,
      total: res.total as number,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const res = await sp[resource as keyof SuperClient].patch(
      { id: id },
      {
        ...variables,
      },
      { returnUpdatedEntities: true },
    );

    return {
      data: res.updated as any,
    };
  },

  create: async ({ resource, variables, meta }) => {
    // console.log({ resource, variables, meta });

    const res = await sp[resource as keyof SuperClient].create({
      ...(variables as any),
    });

    return {
      data: res,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const res = await sp[resource as keyof SuperClient].deleteOne(
      {
        id,
      },
      { returnUpdatedEntities: true },
    );

    return {
      data: res.deleted as any,
    };
  },

  getApiUrl: () => sp.user.config.url,

  getMany: async ({ resource, ids, meta }) => {
    const res = await sp[resource as keyof SuperClient].findIds(ids);

    return {
      data: res.data as any,
    };
  },

  createMany: async ({ resource, variables, meta }) => {
    const res = await sp[resource as keyof SuperClient].createBatch(
      variables as any,
    );

    return {
      data: res,
    };
  },
  // deleteMany: async ({ resource, ids, variables, meta }) => {
  //   const res = await sp[resource as keyof SuperClient].deleteIn(ids);
  //
  //   return {
  //     data: ids.map((id: any) => ({ id })),
  //   };
  // },
  // updateMany: ({ resource, ids, variables, meta }) => Promise
});
