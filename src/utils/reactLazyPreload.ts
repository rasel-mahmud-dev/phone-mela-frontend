
// this function for lazy route load...........
import React, {ComponentType, lazy} from "react";


interface CustomComponentType extends  React.LazyExoticComponent<ComponentType<any>>{
    preload: () => Promise<{default: React.ComponentType<any>}>
}

const ReactLazyPreload = (importStatement:  () => Promise<{default: React.ComponentType<any>}>) => {
    const Component  = lazy(importStatement) as CustomComponentType

    // Component.preload call when preload link clicked
    Component.preload = importStatement;

    return Component;
};

export default ReactLazyPreload