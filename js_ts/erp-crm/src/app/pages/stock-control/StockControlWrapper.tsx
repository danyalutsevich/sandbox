import {PageTitle} from "../../../_metronic/layout/core";
import {useIntl} from "react-intl";
import {Content} from "../../../_metronic/layout/components/content";
import {StockControl} from "../../modules/stockControl/StockControl.tsx";
import {FC} from "react";

const StockControlWrapper: FC = () => {
  const intl = useIntl();

  return (
      <>
        <Content>
            <PageTitle breadcrumbs={[]}>
                {intl.formatMessage({ id: "STOCK_CONTROL.STOCK_CONTROL" })}
            </PageTitle>
            <StockControl />
        </Content>
      </>
  )
}

export default StockControlWrapper;