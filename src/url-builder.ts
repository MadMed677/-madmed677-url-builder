import * as _ from 'lodash';
import {IInitiateRoutes, IUrlBuilder} from './url-builder.interface';

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

        const applications = _.map(routes, (actions, appName) => {
            return {
                applicationName: appName,
                routes: _.map(actions, (actionParams, actionName) => ({
                    name: actionName,
                    params: actionParams
                })),
                config: this._params.applications[appName]
            };
        });

        return applications;
    }
}
