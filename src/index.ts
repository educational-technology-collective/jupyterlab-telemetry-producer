import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ITelemetryRouter } from 'telemetry-router';

import {
  INotebookTracker,
  NotebookPanel
} from '@jupyterlab/notebook';

import { ETCJupyterLabTelemetryLibrary } from './library';

import { INotebookEventMessage } from './types';

// import {
//   producerCollection,
// } from './events';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'telemetry-producer:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  requires: [
    ITelemetryRouter,
    INotebookTracker
  ],
  activate: (
    app: JupyterFrontEnd,
    telemetryRouter: ITelemetryRouter,
    notebookTracker: INotebookTracker
  ) => {
    console.log('JupyterLab extension telemetry-producer is activated!');

    notebookTracker.widgetAdded.connect((notebookTracker: INotebookTracker, notebookPanel: NotebookPanel) => {
      telemetryRouter.loadNotebookPanel(notebookPanel)
      const config = {
        notebook_clipboard_event: true,
        notebook_visibility_event: true,
        notebook_save_event: true,
        notebook_close_event: true,
        notebook_open_event: true,
        notebook_cell_remove_event: true,
        notebook_cell_add_event: true,
        notebook_cell_execution_event: true,
        notebook_scroll_event: true,
        notebook_active_cell_change_event: true,
        notebook_cell_error_event: true
      }
      const eventLibrary = new ETCJupyterLabTelemetryLibrary({ notebookPanel, config })
      eventLibrary.activeCellChangeEvent.activeCellChanged.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.cellAddEvent.cellAdded.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.cellErrorEvent.cellErrored.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.cellExecutionEvent.cellExecuted.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.cellRemoveEvent.cellRemoved.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.notebookClipboardEvent.notebookClipboardCopied.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.notebookClipboardEvent.notebookClipboardCut.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.notebookClipboardEvent.notebookClipboardPasted.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.notebookCloseEvent.notebookClosed.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.notebookOpenEvent.notebookOpened.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.notebookSaveEvent.notebookSaved.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.notebookVisibilityEvent.notebookHidden.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
      eventLibrary.notebookVisibilityEvent.notebookVisible.connect(
        (_, data: INotebookEventMessage) => telemetryRouter.publishEvent(data)
      )
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
