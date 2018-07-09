import * as _ from 'lodash';
import * as urlModule from 'url';
import {IApplicationBuilder, IBuildParams, IQuery, IRoute} from './url-builder.interface';

export class ApplicationBuilder {
    /** Current application */
    private _application?: IApplicationBuilder;

    /** Current action */
    private _action?: IRoute;

    /** URL instance */
    private _buildUrl?: URL;

    constructor(private readonly _applications: IApplicationBuilder[]) {}

    /**
     * Get application by name
     *
     * @param {string} name Application name
     *
     * @return {this}
     */
    public application(name: string) {
        const currentApplication = this._applications.find((app) => app.applicationName === name);

        if (!currentApplication) {
            throw new Error(`Cound not find application: ${name}`);
        }

        this._application = currentApplication;

        return this;
    }

    /**
     * Get action on specific application
     *
     * @param {string} name Action name
     *
     * @return {this}
     */
    public action(name: string) {
        const application = this._application;

        if (!application) {
            throw new Error('Have to call "application" method first to get specific application');
        }

        const routes = application.routes;
        const action = routes.find((route) => route.name === name);

        if (!action) {
            throw new Error(`Could not find action: ${action}`);
        }

        this._action = action;

        return this;
    }

    /**
     * Create url by application and action
     *
     * @return {String}
     */
    public build(params: IBuildParams = {}): string {
        const application = this._application;
        const action = this._action;

        if (!application) {
            throw new Error('Have to call method "application" firstly');
        }

        if (!action) {
            throw new Error('Have to call method "action" firstly');
        }

        const {protocol, host} = application.config;
        const hostname = protocol + '://' + host;
        this._buildUrl = new urlModule.URL(urlModule.resolve(hostname, action.params.pathname));

        const query = {...action.params.query, ...params.query};
        this
            ._addQueryParameters(query)
            ._addHash(params.hash);

        return this._buildUrl.toString();
    }

    /**
     * Add query parameters to url
     *
     * @param {IQuery} query Query parameters
     *
     * @return {this}
     * @private
     */
    private _addQueryParameters(query: IQuery) {
        if (query) {
            _.forEach(query, (value, key) => {
                this._buildUrl.searchParams.set(key, value);
            });
        }

        return this;
    }

    /**
     * Add hash to url
     *
     * @param {string} hash Hash
     *
     * @return {this}
     * @private
     */
    private _addHash(hash?: string) {
        if (hash) {
            this._buildUrl.hash = hash;
        }

        return this;
    }
}
