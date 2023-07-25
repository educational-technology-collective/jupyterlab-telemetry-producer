import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

import { ITelemetryRouter } from 'telemetry-router'

/**
 * Initialization data for the telemetry-producer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'telemetry-producer:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  requires: [
    ITelemetryRouter
  ],
  activate: (
    app: JupyterFrontEnd,
    telemetryRouter: ITelemetryRouter
  ) => {
    console.log('JupyterLab extension telemetry-producer is activated!');

    requestAPI<any>('get-example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The telemetry_producer server extension appears to be missing.\n${reason}`
        );
      });

    console.log('producer test')
    telemetryRouter.hi()
  }
};

export default plugin;
