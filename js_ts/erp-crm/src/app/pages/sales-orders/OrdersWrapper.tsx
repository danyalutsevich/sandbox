import { FC } from "react";
// import { PageTitle } from "../../../_metronic/layout/core";
import { SharedTable } from "./table/SharedTable";
import { Content } from "../../../_metronic/layout/components/content";


const OrdersPage: FC = () => {
  // const [isOpenCreateProduct, setIsOpenCreateProduct] = useState(false);

  // const handleOpenCreationModal = (): void => {
  //   setIsOpenCreateProduct(true);
  // };
  return(
    <>
      <Content>
        <SharedTable className='mb-5 mb-xl-8' type="orders"  />
      </Content>
    </>
    );
};

const OrdersWrapper: FC = () => {
    return (
      <>
        <OrdersPage />
      </>
    );
};

export default OrdersWrapper;
