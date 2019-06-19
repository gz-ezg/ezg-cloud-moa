import { AjaxGet, AjaxDic, AjaxPost } from '@/api/index';

export interface SearchConfig {
  companyname: string;
  name: string;
  tel: string;
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
export const handleUserList = async (realname) => {
  const url = '/user/list';
  return AjaxGet(url, {
    params: {
      page: 1,
      pageSize: 15,
      realname,
    },
  });
};
export const queryCodes = async (arr: string[]) => {
  const url = '/system/tsType/queryTsTypeByGroupCodes';
  return AjaxGet(url, {
    params: {
      groupCodes: arr.join(','),
    },
  });
};

// 商事任务新增
export const addLegworkTask = async config => {
  const url = '/task/addLegworkTask';
  return AjaxPost(url, config);
};
// 市场任务新增
export const addMarketLegworkTask = async config => {
  const url = 'task/addMarketLegworkTask';
  return AjaxPost(url, config);
};

export const addAccLegworkTask = async config => {
  const url = 'task/addAccLegworkTask';
  return AjaxPost(url, config);
};

export const SearchProductByCompanyId = async companyId => {
  const url = 'task/getLegWorkOrderByCompanyId';
  return AjaxGet(url, {
    params: {
      companyId,
    },
  });
};
export const SearchKJProductByCompanyId = async companyId => {
  const url = 'task/getLegCycWorkOrderByCompanyId';
  return AjaxGet(url, {
    params: {
      companyId,
    },
  });
};

export const getLegworkType = async type => {
  const url = 'user/legwork/cycle/type/list';
  return AjaxGet(url, {
    params: {
      type,
    },
  });
};
