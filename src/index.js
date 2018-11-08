import './index.sass'
import { defaultPath, renderConnection, renderPathData, updateConnection } from './utils';
import { Picker } from './picker';

function install(editor) {
    editor.bind('connectionpath');

    const picker = new Picker(editor);

    function pickOutput({ output }) {
        if (output) {
            picker.output = output;
            return;
        }
    }

    function pickConnection(connection) {
        const { output } = connection;

        editor.removeConnection(connection);
        picker.output = output;
    }

    // eslint-disable-next-line max-statements
    function pickInput({ input }) {
        if (picker.output === null) {
            if (input.hasConnection()) {
                picker.output = input.connections[0].output;
                editor.removeConnection(input.connections[0]);
            }
            return true;
        }

        if (!input.multipleConnections && input.hasConnection()) {
            editor.removeConnection(input.connections[0]);
        }

        if (!picker.output.multipleConnections && picker.output.hasConnection()) {
            editor.removeConnection(picker.output.connections[0]);
        }

        if (picker.output.connectedTo(input)) {
            const connection = input.connections.find(c => c.output === picker.output);

            editor.removeConnection(connection);
        }

        editor.connect(picker.output, input);
        picker.output = null;
    }

    editor.on('rendersocket', ({ el, input, output, socket }) => {
        let prevent = false;

        function mouseHandle(e) {
            if (prevent) { return; }
            e.stopPropagation();
            e.preventDefault();

            if (input) {
                pickInput({ input, socket });
            } else if (output) {
                pickOutput({ output, socket });
            }
        }

        el.addEventListener('mousedown', e => (mouseHandle(e), prevent = true));
        el.addEventListener('mouseup', mouseHandle);
        el.addEventListener('click', e => (mouseHandle(e), prevent = false));
        el.addEventListener('mousemove', () => (prevent = false));
    });

    editor.on('mousemove', () => { picker.updateConnection(); });

    editor.on('click', () => { picker.output = null; });

    editor.on('renderconnection', ({ el, connection, points }) => {
        const d = renderPathData(editor, points, connection);

        el.addEventListener('contextmenu', e => {
            e.stopPropagation();
            e.preventDefault();
            
            pickConnection(connection)
        });

        renderConnection({ el, d, connection });
    });

    editor.on('updateconnection', ({ el, connection, points }) => {
        const d = renderPathData(editor, points, connection);

        updateConnection({ el, connection, d });
    });
}

const name = 'rete-polyline-plugin';

export default {
    install,
    defaultPath,
    name
}