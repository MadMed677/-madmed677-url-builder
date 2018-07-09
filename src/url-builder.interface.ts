export interface IUrlBuilder {
    /** Map of applications and those urls */
    applications: IApplications;
}

export interface IApplications {
    [key: string]: IApplication;
}

export interface IApplication {
    /** Protocol */
    protocol: 'http' | 'https';

    /** Host */
    host: string;
}

export interface IRouteConfig {
    pathname: string;
}

export interface IBuildToApp {
    application: string;
}

export interface IInitiateRoutes {
    [key: string]: {
        [key: string]: IRouteConfig
    };
}

export interface IRoute {
    name: string;
    params: IRouteConfig;
}

export interface IApplicationBuilder {
    /** Application name */
    applicationName: string;

    /** Application routes */
    routes: IRoute[];

    /** Application config */
    config: IApplication;
}

export interface IBuildParams {
    /** Query parameters */
    query?: {
        [key: string]: string
    };

    /** Hash */
    hash?: string;
}
