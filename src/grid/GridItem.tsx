import React, { FC, useMemo } from "react";
import { Badge } from 'tdesign-mobile-react'
import { TdGridItemProps, TdGridProps } from "./type";
import useConfig from '../_util/useConfig';

enum LAYOUT {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal'
}

enum ALIGN {
    CENTER = 'center',
    LEFT = 'left',
}

const DEFAULT_COLUMN = 4; 

const DEFAULT_ALIGN = ALIGN.CENTER;

const DEFAULT_GUTTER = 20;

const DEFAULT_LAYOUT = LAYOUT.VERTICAL;

const DEFAULT_BORDER = false;

const getGridItemWidth = (column) => `${100 / column}%`;

const getBorderStyle = (border) => {
    if (typeof border === 'boolean') {
        if (border) {
            return {
                borderColor: '#f6f6f6',
                borderWidth: '1px',
                borderStyle: 'solid'
            };
        } 
        
        return {}
    }
    const {color, width, style} = border;
    return {
        borderColor: color || '#f6f6f6',
        borderWidth: width || '1px',
        borderStyle: style || 'solid',
    };
}

const getLayout = (layout) => {
    const layoutMap = {
        [LAYOUT.VERTICAL] : 'column',
        [LAYOUT.HORIZONTAL]: 'row',
    }
    return layoutMap[layout];
}

const getGridItemTextAlign = (align) => align ===  ALIGN.LEFT ? ALIGN.LEFT : ALIGN.CENTER;

const getGridItemAlign = (align, layout) => {
    const contentAlign =  getGridItemTextAlign(align);
    if (layout === LAYOUT.HORIZONTAL) {
        return {
            justifyContent: contentAlign,
        }
    } 
    return {
        alignItems: contentAlign
    }
};


export interface GridItemProp extends TdGridItemProps, TdGridProps {}

const GridItem: FC<GridItemProp> = (prop) => {
    const {
        border = DEFAULT_BORDER, 
        align = DEFAULT_ALIGN, 
        column = DEFAULT_COLUMN, 
        gutter = DEFAULT_GUTTER,
        description,
        image,
        layout = DEFAULT_LAYOUT, 
        text,
        badgeProps,
    } = prop;

    const { classPrefix } = useConfig();

    const name = `${classPrefix}-grid-item`;

    const gridItemWidth = getGridItemWidth(column);

    const gridItemBorder = getBorderStyle(border);

    const gridItemLayout = getLayout(layout);

    const gridItemAlign = getGridItemAlign(align, layout);

    const gridItemTextAlign = getGridItemTextAlign(align);

    const gridItemImage = useMemo(() => 
        typeof image === 'string' ?  
            (<img 
                src={image} 
                className={`${name}_image`} 
                style={{width: '100%', height: '100%'}}
            />) : image
    , [image, name])

    return <>
        <div className={name} style={{
            width: gridItemWidth,
            height: gridItemWidth,
            paddingLeft: gutter, 
            paddingRight: gutter,
            flexDirection: gridItemLayout,
            textAlign: gridItemTextAlign,
            ...gridItemAlign,
            ...gridItemBorder
        }}>
            {
                badgeProps ? <>
                    <Badge {...badgeProps}>
                        <div className={`${name}__image-box`}>
                            {gridItemImage}
                        </div>
                    </Badge>
                </> : <>
                    <div className={`${name}__image-box`}>
                        {gridItemImage}
                    </div>
                </>
            }
            <div className={`${name}__text`}>
                <div className={`${name}__title`}>
                    { text }
                </div>
                <div className={`${name}__description`}>
                    { description }
                </div>
            </div>
        </div>
    </>
}

export default GridItem;
