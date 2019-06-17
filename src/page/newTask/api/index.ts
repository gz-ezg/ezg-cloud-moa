import { AjaxGet, AjaxDic, AjaxPost } from '@/api/index';
import { async } from 'q';

export interface SearchConfig {
  companyname: string;
  customerName: string;
  customerTel: string;
}

export interface SearchRsp {
  companyid: string;
  companyname: string;
  custFull: string;
  customerid: string;
  tel: string;
}
export const handleSeachCompany = async (config: SearchConfig): Promise<SearchRsp[]> => {
  const url = 'legwork/apiQueryCompanyOrCustomerMsg';
  return AjaxGet(url, {
    params: config,
  });
};
export const handleUserList = async () => {
  const url = '/user/list';
  return AjaxGet(url, {
    params: {
      page: 1,
      pageSize: 100,
    },
  });
};
