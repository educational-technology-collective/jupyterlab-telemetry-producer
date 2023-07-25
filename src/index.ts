import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  LabShell
} from '@jupyterlab/application';

import { requestAPI } from './handler';

import { ITelemetryRouter } from 'telemetry-router';

import { Notebook, NotebookPanel } from '@jupyterlab/notebook';

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

    const labShell = app.shell as LabShell;
    labShell.currentChanged.connect(() => {
      const currentWidget = app.shell.currentWidget;
      const notebookPanel = currentWidget as NotebookPanel;
      const notebook = notebookPanel.content as Notebook;

      telemetryRouter.loadNotebookPanel(notebookPanel)
      const onScrolled = () => {
        telemetryRouter.consumeEventSignal({
          'name': 'scrolling',
          'time': Date.now()
        })
      }
      notebook.node.addEventListener('scroll', onScrolled)
    })
  }
};

export default plugin;
