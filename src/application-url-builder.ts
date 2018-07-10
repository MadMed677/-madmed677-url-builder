import * as _ from 'lodash';
import {IApplicationBuilder, IInitiateRoutes, IUrlBuilder} from './application-url-builder.interface';
import {UrlBuilder} from './url-builder';

export class ApplicationUrlBuilder {
    /** UrlBuilder parameters */
    constructor(private readonly _params: IUrlBuilder) {}

    /**
     * Initialaze application routes
     */
    public routes(routes: IInitiateRoutes) {
        if (_.isEmpty(routes)) {
            throw new Error('Have to pass routes');
        }

        const initialApplicationsName: string[] = Object.keys(this._params.applications);
        const passedApplicationsName: string[] = Object.keys(routes);

        const difference = _.difference(passedApplicationsName, initialApplicationsName);

        if (!_.isEmpty(difference)) {
            throw new Error('One of the routes is not supported');
        }

        const applications: IApplicationBuilder[] = _.map(routes, (actions, appName) => ({
            applicationName: appName,
            routes: _.map(actions, (actionParams, actionName) => ({
                name: actionName,
                params: actionParams,
            })),
            config: {
                ...this._params.applications[appName],
                protocol: this._params.applications[appName].protocol || 'http',
                host: this._params.applications[appName].host,
            },
        }));

        const applicationBuilder = new UrlBuilder(applications);

        return applicationBuilder;
    }
}
