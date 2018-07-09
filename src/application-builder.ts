import {IApplicationBuilder, IRoute} from './url-builder.interface';

export class ApplicationBuilder {
    /** Current application */
    private _application?: IApplicationBuilder;

    /** Current action */
    private _action?: IRoute;

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
}
