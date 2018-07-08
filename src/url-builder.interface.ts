// interface IApplications {
    // [string]: string;
// }
export interface IUrlBuilder {
    /** Map of applications and those urls */
    applications: IApplications;
}

export interface IApplications {
    [key: string]: IApplication;
}

export interface IApplication {
    /** Protocol */
    protocol?: 'http' | 'https';

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
