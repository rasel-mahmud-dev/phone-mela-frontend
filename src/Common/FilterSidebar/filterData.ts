import {ProductAttributesType} from "store/types/prouductReduceTypes";

const filterAbleList: ProductAttributesType[] = [
    // {
    //   id: 231,
    //   attributeName: "brand",
    //   label: "Brand",
    //   options: [
    //     {name: "Nokia", value: 1},
    //     {name: "Samsung", value: 2},
    //     {name: "Apple", value: 3},
    //   ]
    // },
    {
        id: 1,
        attributeName: "ram",
        label: "Ram",
        options: [
            {name: "1GB", value: 1},
            {name: "2GB", value: 2},
            {name: "3GB", value: 3},
            {name: "4GB", value: 4},
            {name: "6GB", value: 6},
            {name: "8GB", value: 8},
        ]
    }, {
        id: 1,
        attributeName: "internal_storage",
        label: "Internal Storage",
        options: [
            // {name: "Less than 16GB", value: [0, 15]},
            {name: "1GB - 15GB", value: [1, 15]},
            {name: "16GB - 31GB", value: [16, 31]},
            {name: "32GB - 63GB", value: [32, 63]},
            {name: "64GB - 127GB", value: [64, 127]},
            {name: "128GB - 255GB", value: [128, 255]},
            {name: "256GB - 500GB", value: [256, 500]}
            // {name: "256GB & Above", value: [256, 0]}
        ],
        optionsForAdd: [
            {name: "8GB", value: 8},
            {name: "16GB", value: 16},
            {name: "32GB", value: 32},
            {name: "64GB", value: 64},
            {name: "128GB", value: 128},
            {name: "256GB", value: 256},
        ]
    },
    {
        id: 232,
        attributeName: "network_type",
        label: "Network Type",
        options: [
            {name: "2G", value: "2G"},
            {name: "3G", value: "3G"},
            {name: "4G", value: "4G"},
            {name: "5G", value: "5G"},
        ]
    },
    {
        id: 2382,
        attributeName: "processor_brand",
        label: "Processor Brand",
        options: [
            {name: "Apple", value: "Apple"},
            {name: "ARM", value: "ARM"},
            {name: "Exynos", value: "Exynos"},
            {name: "Intel", value: "Intel"},
            {name: "Mediatek", value: "Mediatek"},
            {name: "Snapdragon", value: "Snapdragon"},
            {name: "Spreadtrum", value: "Spreadtrum"},
            {name: "Unisoc", value: "Unisoc"},
        ]
    },
    {
        id: 23432,
        attributeName: "cores",
        label: "Number of Cores",
        options: [
            {name: "Single Core", value: 1},
            {name: "Dual Core", value: 2},
            {name: "Quad Core", value: 4},
            {name: "Octa Core", value: 8}
        ]
    },
    {
        id: 1342,
        attributeName: "screen_size",
        label: "Screen Size",
        options: [
            {name: "4inch", value: 4},
            {name: "4.5inch", value: 4.5},
            {name: "5inch", value: 5},
            {name: "5.5inch", value: 5.5},
            {name: "6inch", value: 6},
            {name: "6.4inch", value: 6.4},
            {name: "6.6inch", value: 6.6},
            {name: "6.7inch", value: 6.7},
            {name: "6.8inch", value: 6.8},
            {name: "6.82inch", value: 6.82},
            {name: "7inch", value: 7},
        ]
    },
    {
        id: 231,
        attributeName: "resolution_type",
        label: "Resolution Type",
        options: [
            {name: "Full HD", value: "Full HD"},
            {name: "Full HD+", value: "Full HD+"},
            {name: "FHD", value: "FHD"},
            {name: "Full HD+ AMOLED Display", value: "Full HD+ AMOLED Display"},
            {name: "Full HD+ E3 Super AMOLED Display", value: "Full HD+ E3 Super AMOLED Display"},
            {name: "Full HD+ Super AMOLED Display", value: "Full HD+ Super AMOLED Display"},
            {name: "FWVGA", value: "FWVGA"},
            {name: "FWVGA+", value: "FWVGA+"},
            {name: "HD", value: "HD"},
            {name: "HD+", value: "HD+"},
            {name: "HQVGA", value: "HQVGA"},
            {name: "HVGA", value: "HVGA"},
            {name: "Liquid Retina HD Display", value: "Liquid Retina HD Display"},
            {name: "Quad HD", value: "Quad HD"},
            {name: "Quad HD+", value: "Quad HD+"},
            {name: "quarter HD", value: "quarter HD"},
            {name: "Quarter QVGA", value: "Quarter QVGA"},
            {name: "QVGA", value: "QVGA"},
            {name: "QXGA+", value: "QXGA+"},
            {name: "Retina Display", value: "Retina Display"},
            {name: "Retina HD Display", value: "Retina HD Display"},
            {name: "Super Retina HD Display", value: "Super Retina HD Display"},
            {name: "Super Retina XDR Display", value: "Super Retina XDR Display"},
            {name: "UHD 4K", value: "UHD 4K"},
            {name: "VGA", value: "VGA"},
            {name: "WQHD", value: "WQHD"},
            {name: "WVGA", value: "WVGA"},
        ]
    },
    {
        id: 6,
        label: "Primary Camera",
        attributeName: "primary_camera",
        options: [
            {name: "0MP - 5MP", value: [0, 5]},
            {name: "5MP - 8MP", value: [5, 8]},
            {name: "12MP - 16MP", value: [12, 15]},
            {name: "16MP - 32MP", value: [16, 31]},
            {name: "32MP - 47MP", value: [32, 47]},
            {name: "48MP - 63MP", value: [48, 63]},
            {name: "64MP - 108MP", value: [64, 108]},
            {name: "109MP - 150MP", value: [109, 150]}
        ],
        optionsForAdd: [
            {name: "1MP", value: 1},
            {name: "2MP", value: 2},
            {name: "5MP", value: 5},
            {name: "8MP", value: 8},
            {name: "12MP", value: 12},
            {name: "13MP", value: 13},
            {name: "16MP", value: 16},
            {name: "32MP", value: 32},
            {name: "48MP", value: 48},
            {name: "50MP", value: 50},
            {name: "64MP", value: 64},
            {name: "108MP", value: 108}
        ]
    },
    {
        id: 7,
        label: "Secondary Camera",
        attributeName: "secondary_camera",
        options: [
            {name: "0MP - 5MP", value: [0, 5]},
            {name: "5MP - 8MP", value: [5, 8]},
            {name: "12MP - 16MP", value: [12, 15]},
            {name: "16MP - 32MP", value: [16, 31]},
            {name: "32MP - 47MP", value: [32, 47]},
            {name: "48MP - 64MP", value: [48, 64]}
        ],
        optionsForAdd: [
            {name: "1MP", value: 1},
            {name: "2MP", value: 2},
            {name: "5MP", value: 5},
            {name: "8MP", value: 8},
            {name: "12MP", value: 12},
            {name: "13MP", value: 13},
            {name: "16MP", value: 16},
            {name: "32MP", value: 32},
            {name: "48MP", value: 48},
            {name: "50MP", value: 50},
            {name: "64MP", value: 64}
        ]
    },
    {
        id: 3,
        label: "Battery Capacity",
        attributeName: "battery",
        options: [
            {name: "1000mAh - 1999mAh", value: [1000, 1999]},
            {name: "2000mAh - 2999mAh", value: [2000, 2999]},
            {name: "3000mAh - 3999mAh", value: [3000, 3999]},
            {name: "4000mAh - 4999mAh", value: [4000, 4999]},
            {name: "5000mAh - 5999mAh", value: [5000, 5999]},
            {name: "6000mAh - 6999mAh", value: [6000, 6999]},
            {name: "7000mAh - 1000mAh", value: [7000, 10000]}
        ],
        optionsForAdd: [
            {name: "1000mAh", value: 1000},
            {name: "2000mAh", value: 2000},
            {name: "2500mAh", value: 2500},
            {name: "3000mAh", value: 3000},
            {name: "3500mAh", value: 3500},
            {name: "4000mAh", value: 4000},
            {name: "4500mAh", value: 4500},
            {name: "5000mAh", value: 5000},
            {name: "5100mAh", value: 5100},
            {name: "5500mAh", value: 5500},
            {name: "6000mAh", value: 6000},
            {name: "7000mAh", value: 7000},
        ]
    },
    {
        id: 9,
        label: "Operation System",
        attributeName: "operating_system",
        options: [
            {name: "Android", value: "Android"},
            {name: "Linux", value: "Linux"},
            {name: "Java", value: "Java"},
            {name: "Symbian OS", value: "Symbian"},
            {name: "KaiOS", value: "KaiOS"},
            {name: "IOS", value: "IOS"},
            {name: "WINDOWS", value: "Windows"},
        ]
    },
    {
        id: 10,
        label: "System Version",
        attributeName: "os_version",
        options: [
            {name: "Symbian 9", value: "Symbian-9"},
            {name: "Symbian 10", value: "Symbian-10"},
            {name: "Android 5", value: "android-5"},
            {name: "Android 6", value: "android-6"},
            {name: "Android 7", value: "android-7"},
            {name: "Android 8", value: "android-8"},
            {name: "Android 9", value: "android-9"},
            {name: "Android 10", value: "android-10"},
            {name: "Android 11", value: "android-11"},
            {name: "Android 12", value: "android-12"},
            {name: "Android 13", value: "android-13"},
            {name: "iOS 8", value: "iOS-8"},
            {name: "iOS 9", value: "iOS-9"},
            {name: "iOS 10", value: "iOS-10"},
            {name: "iOS 11", value: "iOS-11"},
            {name: "iOS 12", value: "iOS-12"},
            {name: "iOS 13", value: "iOS-13"},
            {name: "iOS 14", value: "iOS-14"},
            {name: "iOS 15", value: "iOS-15"},
            {name: "Windows 8", value: "windows-8"},
            {name: "Windows 10", value: "windows-10"},
            {name: "Windows 11", value: "windows-11"},
        ]
    }
]
export default filterAbleList