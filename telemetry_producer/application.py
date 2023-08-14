from .handlers import RouteHandler
from jupyter_server.extension.application import ExtensionApp
from traitlets import Bool, List

class TelemetryProducerApp(ExtensionApp):

    name = "telemetry_producer"

    notebook_clipboard_event = Bool(True).tag(config=True)
    notebook_visibility_event = Bool(True).tag(config=True)
    notebook_save_event = Bool(True).tag(config=True)
    notebook_close_event = Bool(True).tag(config=True)
    notebook_open_event = Bool(True).tag(config=True)
    notebook_cell_remove_event = Bool(True).tag(config=True)
    notebook_cell_add_event = Bool(True).tag(config=True)
    notebook_cell_execution_event = Bool(True).tag(config=True)
    notebook_scroll_event = Bool(True).tag(config=True)
    notebook_active_cell_change_event = Bool(True).tag(config=True)
    notebook_cell_error_event = Bool(True).tag(config=True)

    logNotebookContentEvents = List([]).tag(config=True)

    def initialize_settings(self):
        try:
            assert self.logNotebookContentEvents, "The c.TelemetryProducerApp.logNotebookContentEvents configuration setting must be set."

        except Exception as e:
            self.log.error(str(e))
            raise e

    def initialize_handlers(self):
        try:
            self.handlers.extend([(r"/telemetry-producer/(.*)", RouteHandler)])
        except Exception as e:
            self.log.error(str(e))
            raise e
