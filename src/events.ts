// import {
//     Notebook,
//     INotebookTracker,
//     NotebookActions,
// } from "@jupyterlab/notebook";
// import {
//     Cell,
//     // CodeCell,
//     // MarkdownCell,
//     ICellModel
// } from '@jupyterlab/cells';
// import { ITelemetryRouter } from 'telemetry-router';

// export class ActiveCellChangedEventProducer {
//     static id: string = 'ActiveCellChangedEvent';

//     listen(notebookTracker: INotebookTracker, router: ITelemetryRouter) {
//         notebookTracker.activeCellChanged.connect(
//             (notebookTracker: INotebookTracker, args: Cell<ICellModel> | null) => {
//                 if (args && notebookTracker.currentWidget?.content.widgets) {
//                     const activatedCell = {
//                         id: args?.model.id,
//                         index: notebookTracker.currentWidget.content.widgets.findIndex((value: Cell<ICellModel>) => value == args)
//                     }
//                     const event = {
//                         eventName: ActiveCellChangedEventProducer.id,
//                         eventTime: Date.now(),
//                         activatedCell: activatedCell,
//                     };
//                     router.publishEvent(event)
//                 }
//             });
//     }
// }

// export class CellExecutionEventProducer {
//     static id: string = 'CellExecutionEvent';

//     listen(_: any, router: ITelemetryRouter) {
//         NotebookActions.executed.connect((__: any, args: { notebook: Notebook; cell: Cell<ICellModel> }) => {
//             const executedCell = {
//                 id: args.cell.model.id,
//                 index: args.notebook.widgets.findIndex((value) => value == args.cell)
//             }
//             const event = {
//                 eventName: CellExecutionEventProducer.id,
//                 eventTime: Date.now(),
//                 executedCell: executedCell,
//             };
//             router.publishEvent(event)
//         })
//     }
// }


// export const producerCollection = [
//     ActiveCellChangedEventProducer,
//     CellExecutionEventProducer,
// ]