import { XSRF_COOKIE_NAME, XSRF_HEADER_NAME } from './utils';

export interface IXSRFConfig {
    XSRFCookieName?: string;
    XSRFHeaderName?: string;
}

export let xsrfConfig: IXSRFConfig = {
    XSRFCookieName: XSRF_COOKIE_NAME,
    XSRFHeaderName: XSRF_HEADER_NAME,
};

export class XSRFModule {
    public static initialize = ({ XSRFCookieName, XSRFHeaderName }: IXSRFConfig) => {
        xsrfConfig.XSRFCookieName = XSRFCookieName;
        xsrfConfig.XSRFHeaderName = XSRFHeaderName;
    }
}
