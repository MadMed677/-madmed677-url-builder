import * as nativeUrl from 'url';
import {IApplications, IBuildToApp, IUrlBuilder} from './url-builder.interface';

export class Builder {
    /** UrlBuilder parameters */
    private _params: {
        applications?: IApplications,
        host: string
    };

    /** URL instance */
    private _url: URL;

    constructor(params: IUrlBuilder, url: string) {
        this._params = params;
        this._url = new nativeUrl.URL(url);
    }

    /**
     * Build url
     *
     * @return {URL}
     */
    public buildUrl(): URL {
        return this._url;
    }

    /**
     * Build url to application
     */
    public buildToApp(params: IBuildToApp) {
        const applications = this._params.applications;
        if (!applications) {
            throw new Error('Have to declare applications in the constructor');
        }

        const application: string = applications[params.application];

        if (!application) {
            throw new Error('Application has not found');
        }
    }
}
