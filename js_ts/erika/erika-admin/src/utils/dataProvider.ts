import {
  DataProvider,
  GetListResult,
  GetOneResult,
  RaRecord,
} from "react-admin";
import { SuperClient } from "../../../erika/eicrud_exports/super_client";

export const sp = new SuperClient({ url: "http://localhost:3000" });

const getOne = async <RecordType extends RaRecord = any>(
  resource: string,
  params: { id: string },
): Promise<GetOneResult<RecordType>> => {
  console.log("getOne called", { resource, params });

  // Hardcoded data based on resource
  const data: Record<string, any> = {
    users: { id: "123", name: "John Doe", email: "johndoe@example.com" },
    posts: {
      id: "456",
      title: "Post Title",
      content: "Lorem ipsum dolor sit amet",
    },
  };

  // Return the corresponding record for the resource
  return {
    data: data[resource] as RecordType,
  };
};

export default (): DataProvider => ({
  getList: async (resource, params): Promise<GetListResult> => {
    console.log("getList", { resource, params });

    const res: any = await sp[resource].find(
      {
        ...params.filter,
      },
      {
        limit: params.pagination?.perPage,
        offset:
          ((params?.pagination?.page || 0) - 1) *
          (params?.pagination?.perPage || 0),
      },
    );

    return {
      data: res.data as any,
      total: res.total,
    };

    // return {
    //   data: [{ name: "test" }],
    //   total: 1,
    // };
  },

  getOne: async (resource, params) => {
    const a: RaRecord = { id: 1, name: "test" };
    console.log("getOne", { resource, params, a });

    return { data: { id: 1, name: "test" } } as any;
  },

  getMany: async (resource, params) => {
    console.log("getMany", { resource, params });

    return {
      data: [{ id: 1, name: "test" }] as any,
      total: 1,
    };
  },

  // getList: <RecordType extends RaRecord = any>(
  //   resource: ResourceType,
  //   params: GetListParams & QueryFunctionContext
  // ) => Promise<GetListResult<RecordType>>;
  //
  // getOne: <RecordType extends RaRecord = any>(
  //   resource: ResourceType,
  //   params: GetOneParams<RecordType> & QueryFunctionContext
  // ) => Promise<GetOneResult<RecordType>>;
  //
  // getMany: <RecordType extends RaRecord = any>(
  //   resource: ResourceType,
  //   params: GetManyParams<RecordType> & QueryFunctionContext
  // ) => Promise<GetManyResult<RecordType>>;
  //
  // getManyReference: <RecordType extends RaRecord = any>(
  //   resource: ResourceType,
  //   params: GetManyReferenceParams & QueryFunctionContext
  // ) => Promise<GetManyReferenceResult<RecordType>>;
  //
  // update: <RecordType extends RaRecord = any>(
  //   resource: ResourceType,
  //   params: UpdateParams
  // ) => Promise<UpdateResult<RecordType>>;
  //
  // updateMany: <RecordType extends RaRecord = any>(
  //   resource: ResourceType,
  //   params: UpdateManyParams
  // ) => Promise<UpdateManyResult<RecordType>>;
  //
  // create: <
  //   RecordType extends Omit<RaRecord, 'id'> = any,
  //   ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  // >(
  //   resource: ResourceType,
  //   params: CreateParams
  // ) => Promise<CreateResult<ResultRecordType>>;
  //
  // delete: <RecordType extends RaRecord = any>(
  //   resource: ResourceType,
  //   params: DeleteParams<RecordType>
  // ) => Promise<DeleteResult<RecordType>>;
  //
  // deleteMany: <RecordType extends RaRecord = any>(
  //   resource: ResourceType,
  //   params: DeleteManyParams<RecordType>
  // ) => Promise<DeleteManyResult<RecordType>>;
  //
  // [key: string]: any;
  // supportAbortSignal?: boolean;
  //
});
