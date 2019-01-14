import { HttpInterceptor } from "../interceptor/interceptor";

export class HttpModel {
    private baseUrl: string = '';
    private enableXSRF: boolean = false;
    private XSRFCookieName: string = 'XSRF-TOKEN';
    private XSRFHeaderName: string = 'X-XSRF-TOKEN';

    private HttpInterceptors: HttpInterceptor[] = [];
    private static instance: HttpModel;

    private constructor() { }


    public static x() {
        if (this.instance !== null) return this.instance;
        return this.instance = new HttpModel();
    }

    /**
     * Getter $baseUrl
     * @return {any }
     */
    public get $baseUrl(): any {
        return this.baseUrl;
    }

    /**
     * Getter $enableXSRF
     * @return {boolean }
     */
    public get $enableXSRF(): any {
        return this.enableXSRF;
    }

    /**
     * Getter $XSRFCookieName
     * @return {any }
     */
    public get $XSRFCookieName(): any {
        return this.XSRFCookieName;
    }

    /**
     * Getter $XSRFHeaderName
     * @return {any }
     */
    public get $XSRFHeaderName(): any {
        return this.XSRFHeaderName;
    }

    /**
     * Getter $HttpInterceptors
     * @return {any }
     */
    public get $HttpInterceptors():any {
        return this.HttpInterceptors;
    }

    /**
     * Setter $baseUrl
     * @param {any } value
     */
    public set $baseUrl(value: any) {
        this.baseUrl = value;
    }

    /**
     * Setter $enableXSRF
     * @param {boolean } value
     */
    public set $enableXSRF(value: any) {
        this.enableXSRF = value;
    }

    /**
     * Setter $XSRFCookieName
     * @param {any } value
     */
    public set $XSRFCookieName(value: any) {
        this.XSRFCookieName = value;
    }

    /**
     * Setter $XSRFHeaderName
     * @param {any } value
     */
    public set $XSRFHeaderName(value: any) {
        this.XSRFHeaderName = value;
    }

    /**
     * Setter $HttpInterceptors
     * @param { HttpInterceptor } value
     */
    public set $HttpInterceptors(value: any) {
        this.HttpInterceptors = [];
        this.HttpInterceptors.push(...value);
    }
}
