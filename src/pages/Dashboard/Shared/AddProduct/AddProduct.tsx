import React, {FormEvent} from 'react'
import {connect} from 'react-redux'
// import queryString from 'query-string';

import {addNewBrand, fetchProduct, loading} from 'actions/productAction'

import Input2 from "UI/Form/Input/Input2"
import Button from "UI/Button/Button"
import api from "apis/api"

import fullLink from "src/utils/fullLink";
import {BrandType, ProductStateType} from "reducers/productReducer";
import {FilterAttributesType, ProductAttributesName} from "store/types/prouductReduceTypes";

import "./styles.scss"


import filterAbleList from "src/Common/FilterSidebar/filterData"
import {RootStateType} from "store/index";
import withParams from "../../../../Hoc/WithParams";
import MultiInput from "UI/Form/multiInput/MultiInput";
import withLocation from "../../../../Hoc/WithLocation";
import withNavigate from "../../../../Hoc/WithNavigate";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import Input from 'components/UI/Form/Input/Input'
import ImageChoose from "components/ImageChooser/ImageChooser";
import HttpResponse from "components/HttpResponse/HttpResponse";
import {toast} from "react-toastify";
import uploadImage from "../../../../utils/uploadImage";

type UpdateProductType = {
    id: number
    title: string
    brand_id: number
    description: string
    price: number
    author_id: number
    seller_id: number
    discount: number
    stock: number
    cover: string
    tags: string[]
    attributes: "{\"ram\": 4, \"rom\": 64, \"color\": [\"red\", \"blue\", \"pink\", \"gray\"], \"camera\": 13, \"battery\": 1000}",
    created_at: string
    updated_at: string
    user_id: number
    username: string
    avatar: string
    email: string
}

interface Props {
    productState: ProductStateType
    auth: any
    params: { productId: string }
    history: { push: (args: string) => void }
    location: { search: string }
    navigate: (to: string) => void
}

type UserDataType = {
    title: { value?: string, touched: boolean, errorMessage?: string },
    description: { value?: string, touched: boolean, errorMessage?: string },
    price: { value: number | null, touched: boolean, errorMessage?: string },
    discount: { value: number | null, touched: boolean, errorMessage?: string },
    cover: { value?: string, touched: boolean, errorMessage?: string },
    stock: { value: number | null, touched: boolean, errorMessage?: string },
    brand_id: { value: { name: string, _id: string | null }, touched: boolean, errorMessage?: string },
    tags: string[],

    // tags: "[\"Redmi Note 11\", \"Redmi Note 11s\", \"Redmi Note 11 pro\"]",

    // seller_id: { value: number | null, touched: boolean, errorMessage?: string },
    // author_id: { value: number | null, touched: boolean, errorMessage?: string },

    // brand_id: number
    // author_id: number
    // seller_id: number

    // attributes: "{\"ram\": 4, \"rom\": 64, \"color\": [\"red\", \"blue\", \"pink\", \"gray\"], \"camera\": 13, \"battery\": 1000}",
    // created_at: string
    // updated_at: string
    // user_id: number
    // username: string
    // avatar: string
    // email: string
}

type ErrorDataType = {
    [key in keyof UserDataType]: string;
}

type FilterAttributeErrorType = {
    [key in ProductAttributesName]: string;
}


interface State {
    userData: UserDataType,
    errorsData: ErrorDataType,
    // filterAttributes: {
    //   "ram": {value: number, options: {name: string, value: number}[]}
    //   "internal_storage": {value: number, options: {name: string, value: string}[]}
    //   "display": {value: string, options: {name: string, value: string}[]}
    //   "network_type": {value:  string, options: {name: string, value: string}[]}
    //   "processor_brand": {value:  string, options: {name: string, value: string}[]}
    //   "cores": {value: number, options: {name: string, value: string}[]}
    //   "screen_size": {value:  number, options: {name: string, value: string}[]}
    //   "resolution_type": {value: string, options: {name: string, value: string}[]}
    //   "primary_camera": {value: number, options: {name: string, value: string}[]}
    //   "secondary_camera": {value: number, options: {name: string, value: string}[]}
    //   "battery": {value: number, options: {name: string, value: string}[]}
    //   "operating_system": {value:  string, options: {name: string, value: string}[]}
    //   "os_version": {value:  string, options: {name: string, value: string}[]}
    // },
    filterAttributes: FilterAttributesType,
    errorsFilterAttribute: FilterAttributeErrorType,
    brands: BrandType[],
    newBrandAdd: boolean,
    isShowStaticPhotos: boolean,
    staticPhotos: string[],
    updatedProductId: string,
    httpResponse: {
        loading: boolean,
        isSuccess: boolean,
        message: string
    }
}


class AddProduct extends React.Component<Readonly<Props>, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            userData: {
                title: {value: "234234", touched: false, errorMessage: ""},
                description: {value: "23423", touched: false, errorMessage: ""},
                price: {value: 234, touched: false, errorMessage: ""},
                discount: {value: 234, touched: false, errorMessage: ""},
                brand_id: {value: {name: "", _id: ""}, touched: false, errorMessage: ""},
                stock: {value: 20, touched: false, errorMessage: ""},
                cover: {value: "", touched: false, errorMessage: ""},
                tags: []
            },
            errorsData: {
                brand_id: "",
                cover: "",
                description: "",
                discount: "",
                price: "",
                stock: "",
                tags: "",
                title: ""
            },
            filterAttributes: {
                ram: {value: 0, options: []},
                internal_storage: {value: 0, options: []},
                network_type: {value: "", options: []},
                processor_brand: {value: "", options: []},
                cores: {value: 0, options: []},
                screen_size: {value: 0, options: []},
                resolution_type: {value: "", options: []},
                primary_camera: {value: 0, options: []},
                secondary_camera: {value: 0, options: []},
                battery: {value: 0, options: []},
                operating_system: {value: "", options: []},
                os_version: {value: "", options: []},
            },
            errorsFilterAttribute: {
                battery: "",
                cores: "",
                internal_storage: "",
                network_type: "",
                operating_system: "",
                os_version: "",
                primary_camera: "",
                processor_brand: "",
                ram: "",
                resolution_type: "",
                screen_size: "",
                secondary_camera: ""
            },
            brands: [],
            newBrandAdd: false,
            isShowStaticPhotos: false,
            staticPhotos: [],
            updatedProductId: "",
            httpResponse: {
                loading: false,
                isSuccess: false,
                message: ""
            }
        }
    }

    async componentDidMount() {
        const {productId} = this.props.params

        let updateState: any = {...this.state}

        // fetch all brand for adding categories
        api.get("/api/brands").then(response => {
            if (response.status === 200) {
                this.setState({...this.state, brands: response.data})
            }
        })

        // populated all filter items for select product attributes
        filterAbleList.forEach(fList => {
            updateState.filterAttributes[fList.attributeName] = {
                ...updateState.filterAttributes[fList.attributeName],
                // @ts-ignore
                options: fList.optionsForAdd ? fList.optionsForAdd : fList.options
            }
        })


        // for update products
        if (productId) {
            // const response = await api.get(`/api/product/${productId}`)
            // if (response.status === 200) {
            //     const {_id, title, brand_id, description, price, discount, stock, cover, tags, attributes = {}} = response.data
            //
            //
            //     this.setState((prevState: Readonly<State>): State => {
            //
            //         /**
            //          Set Each on Product Attributes value
            //          { ram: {value: 6 }[]
            //          */
            //
            //         let updatedFilterAttributes: FilterAttributesType = {...prevState.filterAttributes}
            //         let key: keyof FilterAttributesType
            //         for (key in updatedFilterAttributes) {
            //             if (attributes[key]) {
            //                 updatedFilterAttributes[key] = {
            //                     ...updatedFilterAttributes[key],
            //                     value: attributes[key]
            //                 }
            //             }
            //         }
            //
            //         /**
            //          Set Each on Product Attributes dropdown select options values
            //          { ram: {value: 6, options: Array(6)} }[]
            //          */
            //
            //
            //         // filterAbleList.forEach(fList => {
            //         //     updatedFilterAttributes[fList.attributeName] = {
            //         //         ...updatedFilterAttributes[fList.attributeName],
            //         //         // @ts-ignore
            //         //         options: fList.optionsForAdd ? fList.optionsForAdd : fList.options
            //         //     }
            //         // })
            //
            //         return {
            //             ...prevState,
            //             userData: {
            //                 ...prevState.userData,
            //                 title: {value: title, errorMessage: "", touched: true},
            //                 description: {value: description, errorMessage: "", touched: true},
            //                 discount: {value: discount, errorMessage: "", touched: true},
            //                 stock: {value: stock, errorMessage: "", touched: true},
            //                 price: {value: price, errorMessage: "", touched: true},
            //                 cover: {value: cover, errorMessage: "", touched: true},
            //                 tags: tags ? tags : [],
            //                 brand_id: {value: {_id: brand_id ? brand_id : 0, name: ""}, touched: true}
            //             },
            //             filterAttributes: updatedFilterAttributes,
            //             updatedProductId: _id
            //         }
            //     })
            // }
        }

        this.setState(updateState)
    }


    componentDidUpdate(prevProps: Readonly<Props>, prevState: State) {

        const {productId} = this.props.params

        // if (prevProps.productState.productDetails  !== this.props.productState.productDetails){
        //   let userData = {...this.state.userData}
        //   const product: any = this.props.productState.productDetails
        //   for (let key in this.state.userData) {
        //     if (key === "cover_photo"){
        //       userData.cover.value = product.photo
        //     } else{
        //       userData[key].value = product[key]
        //     }
        //   }
        //   this.setState({userData})
        // }

        if (prevProps.params !== this.props.params) {
            const {productId} = this.props.params

            this.setState((prevState: Readonly<State>): State => {
                return {
                    ...prevState,
                    updatedProductId: productId ? productId : ""
                }
            })
        }

    }

    handleChange = (e: any) => {

        const target = e.target as typeof e.target & {
            name: string;
            value: string | number;
            values?: string[];
        };

        const {name, value, values} = target

        let updatedState = {...this.state}

        const {userData, brands} = this.state

        if (name === "brand_id") {
            let brand = brands.find(b => b._id == value)

            updatedState = {
                ...updatedState,
                userData: {
                    ...userData,
                    [name]: {
                        ...userData[name as keyof UserDataType],
                        value: {
                            name: brand && brand.name,
                            _id: value
                        }
                    }
                }
            }

        } else if (name === "tags") {

            updatedState.userData[name] = values

        } else {

            updatedState = {
                ...updatedState,
                userData: {
                    ...userData,
                    [name]: {
                        ...userData[name as keyof UserDataType],
                        value: value
                    }
                }
            }

        }

        this.setState(updatedState)

    }

    handleSave = async (e: any) => {
        e.preventDefault()

        this.setState(prev => ({...prev, httpResponse: {message: "", isSuccess: true, loading: false}}))

        const {auth} = this.props

        interface UserDataItem {
            value: object | string | number
            touched: boolean;
            errorMessage?: string
        }


        const {userData, filterAttributes, updatedProductId} = this.state
        let isCompleted = true;
        let body = {}

        let errors: ErrorDataType = {
            brand_id: "",
            cover: "",
            description: "",
            discount: "",
            price: "",
            stock: "",
            tags: "",
            title: ""
        }


        let attrErrors: FilterAttributeErrorType = {
            battery: "",
            cores: "",
            internal_storage: "",
            network_type: "",
            operating_system: "",
            os_version: "",
            primary_camera: "",
            processor_brand: "",
            ram: "",
            resolution_type: "",
            screen_size: "",
            secondary_camera: ""
        }

        let errorMessage = ""

        let key: keyof UserDataType
        for (key in userData) {
            let item: UserDataItem = userData[key] as UserDataItem

            if (key === "discount") {

            } else if (key === "brand_id") {
                if (typeof item.value == "object") {
                    let brand = (item.value as any)
                    if (!brand._id) {
                        isCompleted = false
                        errors.brand_id = "Brand is Required"

                        if(!errorMessage){
                            errorMessage =   "Brand is Required"
                        }
                    }
                }

            } else if (key === "tags") {

            } else {
                if (!item.value) {
                    if(!errorMessage){
                        errorMessage =  key.toUpperCase() + " is Required"
                    }
                    errors[key] = key.toUpperCase() + " is Required"
                    isCompleted = false
                }
            }
        }

        let key2: keyof FilterAttributesType
        for (key2 in filterAttributes) {
            if (!filterAttributes[key2].value) {
                attrErrors[key2] = key2 + " required."
                isCompleted = false
                if(!errorMessage){
                    errorMessage = key2 + " required."
                }
            }
        }


        if (!isCompleted) {
            toast.error(errorMessage)

            this.setState(prevState => {
                return {
                    ...prevState,
                    errorsData: errors,
                    errorsFilterAttribute: attrErrors
                }
            })
            return
        }

        let reqPayload: any = {
            _id: updatedProductId,
            title: userData.title.value,
            brand_id: userData.brand_id.value._id,
            description: userData.description.value,
            price: Number(userData.price.value),
            discount: Number(userData.discount.value),
            stock: Number(userData.stock.value),
            cover: userData.cover.value,
            tags: userData.tags,
        }


        let attributes: any = {}
        let filterAttributesKey: keyof FilterAttributesType
        for (filterAttributesKey in filterAttributes) {
            let num = Number(filterAttributes[filterAttributesKey].value)
            if (isNaN(num)) {
                attributes[filterAttributesKey] = filterAttributes[filterAttributesKey].value

            } else {
                attributes[filterAttributesKey] = num
            }
        }
        reqPayload.attributes = attributes

        // start loading...
        this.setState(prevState => {
            return {
                ...prevState,
                httpResponse: {message: "", isSuccess: true, loading: true}
            }
        })



        if(reqPayload.cover && typeof reqPayload.cover === "object"){
            if(reqPayload.cover.size > 1024 * 200){
                toast.info("Please choose image under 200kb")
            }
        } else {
            toast.info("Please choose an image file")
        }


        try {
            let uploadResult = await uploadImage(reqPayload.cover);
            if (!uploadResult || !uploadResult.data) {
                toast.error("Picture upload fail please try again");
                return this.setState(prevState => {
                    return {
                        ...prevState,
                        httpResponse: {message: "Picture upload fail please try again", isSuccess: false, loading: false}
                    }
                })
            }

            reqPayload.cover = uploadResult?.data?.url

            let {data, status} =  await api.post(`/api/add-product`, reqPayload)
            if (status === 201) {
                return this.setState(prevState => {
                    return {
                        ...prevState,
                        httpResponse: {message: "Product upload successful", isSuccess: true, loading: false}
                    }
                })
            }

        } catch (ex){
            toast.error(ex.message || "Internal error, please try again")
        } finally {
            this.setState(prevState => {
                return {
                    ...prevState,
                    httpResponse: {message: "", isSuccess: false, loading: false}
                }
            })
        }

        // if (updatedProductId) {
        //     // update a existing  product
        //     api.put(`/api/products/update/${updatedProductId}`, reqPayload).then(response => {
        //         if (response.status === 201) {
        //             // let q: any = queryString.parse(this.props.location.search)
        //             // this.props.navigate(q.callback)
        //         }
        //
        //     }).catch(ex => {
        //         console.log(ex)
        //         alert("update fail. ")
        //     })
        // }
    }



    handleChangeAttribute = (e: { target: { name: string, value: string } }) => {
        let {value} = e.target
        let name: ProductAttributesName = e.target.name as ProductAttributesName

        // console.log(e.target.value, e.target.name)
        let updatedFilterAttributes = {...this.state.filterAttributes}
        updatedFilterAttributes[name] = {
            ...updatedFilterAttributes[name],
            value: value
        }
        this.setState(prevState => {
            return {
                ...prevState,
                filterAttributes: updatedFilterAttributes
            }
        })
    }

    toggleAddNewBrandComponent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        this.setState({newBrandAdd: !this.state.newBrandAdd})
    }


    inputGroup = (label: string, name: string, value: string | number | undefined | null, type: string, onChange: any, errorMessage?: string | undefined) => {
        // @ts-ignore
        return (
            <div className="">
                <Input
                    name={name}
                    type={type}
                    label={label}
                    value={value}
                    error={errorMessage}
                    onChange={onChange}
                />
            </div>
        )
    }

    inputGroupMulti = (label: string, name: string, value: string | number | undefined | null, type: string, onChange: any, errorMessage?: string | undefined) => {
        return (
            <div className="">
                <label htmlFor="">{label}</label>
                <div className="flex">
                    <input
                        className="multi_input"
                        name={name}
                        type={type}
                        value={value as string}
                        onChange={onChange}
                    />
                    <input
                        className="multi_input"
                        name={name}
                        type={type}
                        value={value as string}
                        onChange={onChange}
                    />
                </div>
            </div>
        )
    }

    selectGroup = (label: string, name: string, value: string | number | undefined | null, type: string, options: { name: string, id?: number, value: string | number }[], onChange: any, errorMessage?: string | undefined) => {
        return (
            <div className="select_group mt-4 mx-2">
                <label className="block" htmlFor="">{label}</label>
                {errorMessage && <div className="text-xs text-secondary-400 mt-1">
                    <span>{errorMessage}</span>
                </div>}

                <div className="flex">
                    <select
                        className="multi_input"
                        name={name}
                        value={value as string}
                        onChange={onChange}
                    >
                        <option value="">Select {label}</option>
                        {options && options.map(opt => (
                            <option value={opt.value}>{opt.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }

    handleTagChange(e) {

    }

    render() {
        const {
            userData,
            errorsData,
            errorsFilterAttribute,
            brands,
            filterAttributes,
            updatedProductId,
            newBrandAdd
        } = this.state
        return (
            <div className="py-4">

                <HttpResponse
                    {...this.state.httpResponse}
                    loadingTitle="Product adding..."
                    onClose={()=> this.state.httpResponse.message && this.setState(p=>({...p, httpResponse:{message: "", loading: false, isSuccess: false }})) } />

                <WithSidebarButton>
                    <h2 className="page-title mb-0"> {updatedProductId ? "Update Product" : "Add New Product"}</h2>
                </WithSidebarButton>

                <form onSubmit={this.handleSave}>
                    <div className="card p-4">

                        <h1 className="text-lg font-medium text-start uppercase">General Information</h1>

                        {this.inputGroup("Title", "title", userData.title.value, "text", this.handleChange, errorsData.title)}
                        {this.inputGroup("Description", "description", userData.description.value, "textarea", this.handleChange, errorsData.description)}
                        {this.inputGroup("Price", "price", userData.price.value, "number", this.handleChange, errorsData.price)}
                        {this.inputGroup("Discount", "discount", userData.discount.value, "number", this.handleChange, errorsData.discount)}
                        {this.inputGroup("Stock", "stock", userData.stock.value, "number", this.handleChange, errorsData.stock)}

                        <div className="form-group mt-4">
                            <label className="block no-wrap text-sm dark_subtitle" htmlFor="">Tags</label>
                            <MultiInput placeholder="Enter tag between space" name="tags" onChange={this.handleChange}
                                        defaultValues={userData.tags}/>
                        </div>


                        <div className="select_group mt-4 mx-2">
                            <label className="block" htmlFor="">Brand</label>
                            {errorsData.brand_id && <div className="text-xs text-secondary-400 mt-1">
                                <span>{errorsData.brand_id}</span>
                            </div>}
                            <select className="multi_input" name="brand_id" id="" value={userData.brand_id.value._id as string}
                                    onChange={this.handleChange}>
                                <option value="">Select Brand</option>
                                {brands && brands.map(brand => (
                                    <option value={brand._id}>{brand.name}</option>
                                ))}
                            </select>


                        </div>
                    </div>

                    <div className="card p-4 mt-10">

                        <h1 className="text-lg font-medium text-start uppercase">Photos</h1>

                        <ImageChoose
                            name="cover"
                            label="Cover Photo"
                            onChange={this.handleChange}
                            validate={undefined}
                            labelIcon={undefined}
                            defaultValue={userData.cover.value}
                            error={errorsData.cover}
                            imagePreviewClass="max-w-sm"
                            placeholder="Cover Photo"
                        />

                    </div>

                    <div className="card p-4 mt-10">

                        <h1 className="text-lg font-medium text-start uppercase">Attributes For Filter</h1>

                        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
                            {this.selectGroup("Ram", "ram", filterAttributes.ram.value, "number",
                                filterAttributes.ram.options, this.handleChangeAttribute, errorsFilterAttribute.ram)}

                            {this.selectGroup("Internal Storage", "internal_storage", filterAttributes.internal_storage.value, "text",
                                filterAttributes.internal_storage.options, this.handleChangeAttribute, errorsFilterAttribute.internal_storage)}

                            {this.selectGroup("Processor Cores", "cores", filterAttributes.cores.value, "number",
                                filterAttributes.cores.options, this.handleChangeAttribute, errorsFilterAttribute.cores)}

                            {this.selectGroup("Screen Size", "screen_size", filterAttributes.screen_size.value, "text",
                                filterAttributes.screen_size.options, this.handleChangeAttribute, errorsFilterAttribute.screen_size)}

                            {this.selectGroup("Network Type", "network_type", filterAttributes.network_type.value, "text",
                                filterAttributes.network_type.options, this.handleChangeAttribute, errorsFilterAttribute.network_type)}

                            {this.selectGroup("Operating System", "operating_system", filterAttributes.operating_system.value, "text",
                                filterAttributes.operating_system.options, this.handleChangeAttribute, errorsFilterAttribute.operating_system)}

                            {this.selectGroup("OS Version", "os_version", filterAttributes.os_version.value, "text",
                                filterAttributes.os_version.options, this.handleChangeAttribute, errorsFilterAttribute.os_version)}

                            {this.selectGroup("Processor Brand", "processor_brand", filterAttributes.processor_brand.value, "text",
                                filterAttributes.processor_brand.options, this.handleChangeAttribute, errorsFilterAttribute.processor_brand)}

                            {this.selectGroup("Resolution Type", "resolution_type", filterAttributes.resolution_type.value, "text",
                                filterAttributes.resolution_type.options, this.handleChangeAttribute, errorsFilterAttribute.resolution_type)}

                            {this.selectGroup("Secondary Camera", "secondary_camera", filterAttributes.secondary_camera.value, "text",
                                filterAttributes.secondary_camera.options, this.handleChangeAttribute, errorsFilterAttribute.secondary_camera)}

                            {this.selectGroup("Primary Camera", "primary_camera", filterAttributes.primary_camera.value, "text",
                                filterAttributes.primary_camera.options, this.handleChangeAttribute, errorsFilterAttribute.primary_camera)}

                            {this.selectGroup("Battery", "battery", filterAttributes.battery.value, "text",
                                filterAttributes.battery.options, this.handleChangeAttribute, errorsFilterAttribute.battery)}
                        </div>

                    </div>


                    {/*<File value={state.cover_photo.previewLink} onChange={this.handleChange} name="cover_photo" type="file"/>*/}

                    <Button
                        className="bg-primary-400 text-white mt-6"
                        type="submit">
                        {updatedProductId ? "Update" : "Add Product"}
                    </Button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state: RootStateType) {
    return {auth: state.auth, productState: state.productState}
}

export default connect(mapStateToProps, {fetchProduct, addNewBrand})(
    withNavigate(withLocation(withParams(AddProduct)))
)

