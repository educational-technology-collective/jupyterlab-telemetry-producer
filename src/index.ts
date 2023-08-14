import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker,
  NotebookPanel
} from '@jupyterlab/notebook';

import { ITelemetryRouter } from 'telemetry-router';

import { requestAPI } from './handler';

import { ETCJupyterLabTelemetryLibrary } from './library';

import { INotebookEventMessage } from './types';

// import {
//   producerCollection,
// } from './events';

const PLUGIN_ID = 'telemetry-producer:plugin';

const plugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  description: 'A JupyterLab extension.',
  autoStart: true,
  requires: [
    ITelemetryRouter,
    INotebookTracker
  ],
  activate: async (
    app: JupyterFrontEnd,
    telemetryRouter: ITelemetryRouter,
    notebookTracker: INotebookTracker
  ) => {
    const config = await requestAPI<any>('config')
    const version = await requestAPI<string>('version')
    console.log(config)
    console.log(`${PLUGIN_ID}: ${version}`)

    notebookTracker.widgetAdded.connect((notebookTracker: INotebookTracker, notebookPanel: NotebookPanel) => {
      const eventLibrary = new ETCJupyterLabTelemetryLibrary({ notebookPanel, config })
      const signals = [
        eventLibrary.activeCellChangeEvent.activeCellChanged,
        eventLibrary.cellAddEvent.cellAdded,
        eventLibrary.cellErrorEvent.cellErrored,
        eventLibrary.cellExecutionEvent.cellExecuted,
        eventLibrary.cellRemoveEvent.cellRemoved,
        eventLibrary.notebookClipboardEvent.notebookClipboardCopied,
        eventLibrary.notebookClipboardEvent.notebookClipboardCut,
        eventLibrary.notebookClipboardEvent.notebookClipboardPasted,
        eventLibrary.notebookCloseEvent.notebookClosed,
        eventLibrary.notebookOpenEvent.notebookOpened,
        eventLibrary.notebookSaveEvent.notebookSaved,
        eventLibrary.notebookVisibilityEvent.notebookHidden,
        eventLibrary.notebookVisibilityEvent.notebookVisible
      ];

      telemetryRouter.loadNotebookPanel(notebookPanel)
      signals.forEach((signal) => signal.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      ))

      // producerCollection.forEach((producer) => {
      //   if (['ActiveCellChangedEvent', 'CellExecutionEvent'].includes(producer.id)) {
      //     new producer().listen(notebookTracker, telemetryRouter)
      //   }
      // })
    }
    )
  }
};

export default plugin;
