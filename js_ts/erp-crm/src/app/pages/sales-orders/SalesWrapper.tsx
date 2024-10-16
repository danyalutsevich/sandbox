import { FC } from "react";
// import { PageTitle } from "../../../_metronic/layout/core";
import { SharedTable } from "./table/SharedTable";
import { Content } from "../../../_metronic/layout/components/content";

const SalesPage: FC = () => (
    <>
      <Content>
        <SharedTable className='mb-5 mb-xl-8' type="sales"/>
      </Content>
    </>
);

const SalesWrapper: FC = () => {
    return (
      <>
        {/* <PageTitle breadcrumbs={[]}>
            Sales&Orders 
        </PageTitle> */}
        <SalesPage />
      </>
    );
};

export default SalesWrapper;
