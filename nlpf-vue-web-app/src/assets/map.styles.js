export const fillColor = '#2a4ba9'
export const borderColor = '#627BC1'
export const mutationColor = '#00C5FF'
export const mutationSelectedColor = '#ff5FA8'
export const mutationLieesColor = '#ff8FD8'
export const unmutatedColor = '#212f39'

export const hoverableSources = ['departements', 'communes', 'sections', 'parcelles']
export const fillLayerPaint = {
    "fill-color": fillColor,
    "fill-outline-color": borderColor,
    "fill-opacity": ["case",
        ["boolean", ["feature-state", "hover"], false],
        0.2,
        0
    ]
}

export const contoursPaint = {
    "line-width": [
        'case',
        ["boolean", ["feature-state", "hover"], false],
        3,
        1
    ]
}


export const departementsLayer = {
    id: 'departements-layer',
    source: 'departements',
    type: 'fill',
    paint: fillLayerPaint
}
export const departementsContoursLayer = {
    id: 'departements-contours-layer',
    source: 'departements',
    type: 'line',
    paint: contoursPaint
}

export const communesLayer = {
    id: 'communes-layer',
    source: 'communes',
    type: 'fill',
    paint: fillLayerPaint
}
export const communesContoursLayer = {
    id: 'communes-contours-layer',
    source: 'communes',
    type: 'line',
    paint: contoursPaint
}

export const sections = null;
export const sectionsLayer = {
    id: 'sections-layer',
    source: 'sections',
    type: 'fill',
    paint: fillLayerPaint
}
export const sectionsSymbolLayer = {
    id: 'sections-symbol-layer',
    source: 'sections',
    type: 'symbol',
    paint: {
        'text-halo-color': '#fff',
        'text-halo-width': 2
    },
    layout: {
        'text-field': ['format',
            ['get', 'label'], {}
        ]
    }
}
export const sectionsLineLayer = {
    id: 'sections-line-layer',
    source: 'sections',
    type: 'line',
    paint: contoursPaint
}

export const parcellesLayer = {
    id: 'parcelles-layer',
    source: 'parcelles',
    type: 'fill',
    paint: {
        "fill-color": mutationColor,
        "fill-outline-color": ["case",
            ["boolean", ["feature-state", "selected"], false],
            mutationLieesColor,
            borderColor
        ],
        "fill-opacity": ["case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            ["boolean", ["feature-state", "selected"], false],
            0.8,
            0.4
        ]
    }
}
export const unmutatedParcellesLayer = {
    id: 'unmutated-parcelles-layer',
    source: 'parcelles',
    type: 'fill',
    paint: {
        'fill-color': unmutatedColor,
        'fill-opacity': 0.05
    }
}
export const unmutatedParcellesContoursLayer = {
    id: 'unmutated-parcelles-countours-layer',
    source: 'parcelles',
    type: 'line',
    paint: contoursPaint
}

export const EMPTY_FEATURE_COLLECTION = {
    type: 'FeatureCollection',
    features: []
}