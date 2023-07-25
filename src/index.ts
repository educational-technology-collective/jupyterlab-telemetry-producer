import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

/**
 * Initialization data for the telemetry-producer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'telemetry-producer:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
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
  }
};

export default plugin;
