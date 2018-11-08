function toTrainCase(str) {
    return str.toLowerCase().replace(/ /g, '-');
}

export function defaultPath(points, curvature) {
    const [x1, y1, x2, y2] = points;

    const init = `${x1},${y1}`;
    const point1 = `${(x1 + Math.abs(x2 - x1) / 2)},${y1}`;
    const point2 = `${(x2 - Math.abs(x2 - x1) / 2)},${y2}`;
    const end = `${x2},${y2}`;

    return `${init} ${point1} ${point2} ${end}`;
}

export function renderPathData(emitter, points, connection) {
    const data = { points, connection, d: '' };
    emitter.trigger('connectionpath', data);
    return data.d || defaultPath(points, 0.4);
}

export function updateConnection({ el, d }) {
    const path = el.querySelector('.connection polyline');

    if (!path) { throw new Error('Path of connection was broken'); }

    path.setAttribute('points', d);
}

export function renderConnection({ el, d, connection }) {
    const classed = !connection ? [] : [
        'input-' + toTrainCase(connection.input.name),
        'output-' + toTrainCase(connection.output.name),
        'socket-input-' + toTrainCase(connection.input.socket.name),
        'socket-output-' + toTrainCase(connection.output.socket.name)
    ];

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

    svg.classList.add('connection', ...classed);
    path.classList.add('main-path');
    path.setAttribute('points', d);

    svg.appendChild(path);
    el.appendChild(svg);

    updateConnection({ el, d });
}
