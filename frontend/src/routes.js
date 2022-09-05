import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

//CMS
const CMSList = React.lazy(() => import('./views/cms/cms/CMSList'))
const AddCMS = React.lazy(() => import('./views/cms/cms/AddCMS'))
const EditCMS = React.lazy(() => import('./views/cms/cms/EditCMS'))

//Watches
const WatchesCategories = React.lazy(() => import('./views/watches/categories/WatchesCategories'))
const WatchesAddCategories = React.lazy(() => import('./views/watches/categories/AddCategories'))
const WatchesEditCategories = React.lazy(() => import('./views/watches/categories/EditCategories'))
const WatchesPosts = React.lazy(() => import('./views/watches/posts/WatchesPosts'))
const WatchesAddPosts = React.lazy(() => import('./views/watches/posts/AddPosts'))
const WatchesEditPosts = React.lazy(() => import('./views/watches/posts/EditPosts'))
const WatchesImageList = React.lazy(() => import('./views/watches/posts/ImagesList'))
const WatchesAddImage = React.lazy(() => import('./views/watches/posts/AddImage'))

//Jewelry
const JewelryAddCategories = React.lazy(() => import('./views/jewelry/categories/AddCategories'))
const JewelryAddPosts = React.lazy(() => import('./views/jewelry/posts/AddPosts'))

//Events
const EventsList = React.lazy(() => import('./views/events/events/EventsList'))
const AddEvents = React.lazy(() => import('./views/events/events/AddEvents'))
const EditEvents = React.lazy(() => import('./views/events/events/EditEvents'))
const EventsImageList = React.lazy(() => import('./views/events/events/ImagesList'))
const EventsAddImage = React.lazy(() => import('./views/events/events/AddImage'))

//Lifestyle
const AddLifestyle = React.lazy(() => import('./views/lifestyle/lifestyle/AddLifestyle'))
const LifestyleList = React.lazy(() => import('./views/lifestyle/lifestyle/LifestyleList'))
const EditLifestyle = React.lazy(() => import('./views/lifestyle/lifestyle/EditLifestyle'))
const LifestyleImageList = React.lazy(() => import('./views/lifestyle/lifestyle/ImagesList'))
const LifestyleAddImage = React.lazy(() => import('./views/lifestyle/lifestyle/AddImage'))

//NEWS
const NewsCategories = React.lazy(() => import('./views/news/categories/NewsCategories'))
const NewsAddCategories = React.lazy(() => import('./views/news/categories/AddCategories'))
const NewsEditCategories = React.lazy(() => import('./views/news/categories/EditCategories'))
const NewsPosts = React.lazy(() => import('./views/news/posts/NewsPosts'))
const NewsAddPosts = React.lazy(() => import('./views/news/posts/AddPosts'))
const NewsEditPosts = React.lazy(() => import('./views/news/posts/EditPosts'))
const NewsImagesList = React.lazy(() => import('./views/news/posts/ImagesList'))
const NewsAddImage = React.lazy(() => import('./views/news/posts/AddImage'))

//Celebrity
const CelebrityAddCategories = React.lazy(() =>
  import('./views/celebrity/categories/AddCategories'),
)
const CelebrityCategoriesList = React.lazy(() =>
import('./views/celebrity/categories/CelebrityCategories'),
)
const CelebrityAddCelebrities = React.lazy(() => import('./views/celebrity/celebrity/AddCelebrity'))
const CelebrityList = React.lazy(() => import('./views/celebrity/celebrity/CelebrityList'))
const CelebrityEditCategories = React.lazy(() => import('./views/celebrity/categories/EditCategories'))
const CelebrityEditCelebrities = React.lazy(() => import('./views/celebrity/celebrity/EditCelebrities'))
const CelebrityImageList = React.lazy(() => import('./views/celebrity/celebrity/ImagesList'))
const CelebrityAddImage = React.lazy(() => import('./views/celebrity/celebrity/AddImage'))

//Pieces
const AddPieces = React.lazy(() => import('./views/pieces/pieces/AddPieces'))

//Photoshoot
const PhotoshootList = React.lazy(() => import('./views/photoshoot/photoshoot/PhotoshootList'))
const AddPhotoshoot = React.lazy(() => import('./views/photoshoot/photoshoot/AddPhotoshoot'))
const EditPhotoshoot = React.lazy(() => import('./views/photoshoot/photoshoot/EditPhotoshoot'))
const PhotoshootImageList = React.lazy(() => import('./views/photoshoot/photoshoot/ImagesList'))
const PhotoshootAddImage = React.lazy(() => import('./views/photoshoot/photoshoot/ImagesList'))

//TV
const TvCategories = React.lazy(() => import('./views/tv/categories/TvCategories'))
const TvAddCategories = React.lazy(() => import('./views/tv/categories/AddCategories'))
const TvEditCategories = React.lazy(() => import('./views/tv/categories/EditCategories'))
const TvVideos = React.lazy(() => import('./views/tv/posts/TvPosts'))
const TvAddVideo = React.lazy(() => import('./views/tv/posts/AddPosts'))
const TvEditVideo = React.lazy(() => import('./views/tv/posts/EditPosts'))

//Banners
const AddBanners = React.lazy(() => import('./views/banner/banner/AddAdvertize'))

//Slider
const SliderList = React.lazy(() => import('./views/slider/slider/SliderList'))
const AddSlider = React.lazy(() => import('./views/slider/slider/AddSlider'))
const EditSlider = React.lazy(() => import('./views/slider/slider/EditSlider'))

//Requests
const ContactList = React.lazy(() => import('./views/requests/contact/ContactList'))
const SupscriptionList = React.lazy(() => import('./views/requests/supscription/SupscriptionList'))

//Magazine
const MagazineList = React.lazy(() => import('./views/magazine/magazine/MagazineList'))
const AddMagazine = React.lazy(() => import('./views/magazine/magazine/AddMagazine'))
const EditMagazine = React.lazy(() => import('./views/magazine/magazine/EditMagazine'))
const MagazineImageList = React.lazy(() => import('./views/magazine/magazine/ImagesList'))
const MagazineAddImage = React.lazy(() => import('./views/magazine/magazine/AddImage'))
//Setting
const AddSetting = React.lazy(() => import('./views/settings/settings/AddSettings'))
const SettingList = React.lazy(() => import('./views/settings/settings/SettingList'))
const EditSetting = React.lazy(() => import('./views/settings/settings/EditSetting'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/cms', name: 'CMS', element: CMSList, exact: true },
  { path: '/cms/cms-list', name: 'CMS List', element: CMSList },
  { path: '/cms/add-cms', name: 'Add CMS', element: AddCMS },
  { path: '/cms/edit-cms/:id', name: 'Edit CMS', element: EditCMS },
  { path: '/watches', name: 'Watches', element: WatchesCategories, exact: true },
  { path: '/watches/categories', name: 'Categories', element: WatchesCategories },
  { path: '/watches/add-categories', name: 'Add Categories', element: WatchesAddCategories },
  { path: '/watches/edit-categories/:id', name: 'Edit Categories', element: WatchesEditCategories },
  { path: '/watches/posts', name: 'Posts', element: WatchesPosts },
  { path: '/watches/add-posts', name: 'Add Posts', element: WatchesAddPosts },
  { path: '/watches/edit-posts/:id', name: 'Edit Posts', element: WatchesEditPosts },
  { path: '/watches/post-images-list/:id', name: 'Image List', element: WatchesImageList },
  { path: '/watches/post-images-add/:id', name: 'Add Image', element: WatchesAddImage },
  { path: '/jewelry', name: 'Jewelry', element: JewelryAddCategories, exact: true },
  { path: '/jewelry/categories', name: 'Categories', element: JewelryAddCategories },
  { path: '/jewelry/add-categories', name: 'Add Categories', element: JewelryAddCategories },
  { path: '/jewelry/posts', name: 'Posts', element: JewelryAddPosts },
  { path: '/jewelry/add-posts', name: 'Add Posts', element: JewelryAddPosts },
  { path: '/events', name: 'Events', element: EventsList, exact: true },
  { path: '/events/events-list', name: 'Events List', element: EventsList },
  { path: '/events/add-events', name: 'Add Events', element: AddEvents },
  { path: '/events/edit-events/:id', name: 'Edit Events', element: EditEvents },
  { path: '/events/post-images-list/:id', name: 'Image List', element: EventsImageList },
  { path: '/events/post-images-add/:id', name: 'Add Image', element: EventsAddImage },
  { path: '/lifestyle', name: 'Lifestyle', element: AddLifestyle, exact: true },
  { path: '/lifestyle/lifestyle-list', name: 'Lifestyle List', element: LifestyleList },
  { path: '/lifestyle/add-lifestyle', name: 'Add lifestyle', element: AddLifestyle },
  { path: '/lifestyle/edit-lifestyle/:id', name: 'Edit lifestyle', element: EditLifestyle },
  { path: '/lifestyle/post-images-list/:id', name: 'Image List', element: LifestyleImageList },
  { path: '/lifestyle/post-images-add/:id', name: 'Add Image', element: LifestyleAddImage },
  { path: '/news', name: 'TV', element: NewsCategories, exact: true },
  { path: '/news/categories', name: 'Categories', element: NewsCategories },
  { path: '/news/add-categories', name: 'Add Categories', element: NewsAddCategories },
  { path: '/news/edit-categories/:id', name: 'Edit Categories', element: NewsEditCategories },
  { path: '/news/news', name: 'News', element: NewsPosts },
  { path: '/news/add-news', name: 'Add Posts', element: NewsAddPosts },
  { path: '/news/post-images-list/:id', name: 'Post Images List', element: NewsImagesList },
  { path: '/news/post-images-add/:id', name: 'Add Images', element: NewsAddImage },
  { path: '/news/edit-news/:id', name: 'Edit Posts', element: NewsEditPosts },
  { path: '/celebrity', name: 'Celebrity', element: CelebrityAddCategories, exact: true },
  { path: '/celebrity/categories-list', name: 'Categories', element: CelebrityCategoriesList },
  { path: '/celebrity/add-categories', name: 'Add Categories', element: CelebrityAddCategories },
  { path: '/celebrity/edit-categories/:id', name: 'Edit Categories', element: CelebrityEditCategories },
  { path: '/celebrity/celebrities-list', name: 'Celebrities', element: CelebrityList },
  { path: '/celebrity/add-celebrities', name: 'Add Celebrities', element: CelebrityAddCelebrities },
  { path: '/celebrity/edit-celebrities/:id', name: 'Edit Celebrities', element: CelebrityEditCelebrities },
  { path: '/celebrity/post-images-list/:id', name: 'Image List', element: CelebrityImageList },
  { path: '/celebrity/post-images-add/:id', name: 'Add Image', element: CelebrityAddImage },
  { path: '/pieces', name: 'Pieces', element: AddPieces, exact: true },
  { path: '/pieces/pieces-list', name: 'Pieces List', element: AddPieces },
  { path: '/pieces/add-pieces', name: 'Add pieces', element: AddPieces },
  { path: '/photoshoot', name: 'Photoshoot', element: PhotoshootList, exact: true },
  { path: '/photoshoot/photoshoot-list', name: 'Photoshoot List', element: PhotoshootList },
  { path: '/photoshoot/add-photoshoot', name: 'Add Photoshoot', element: AddPhotoshoot },
  { path: '/photoshoot/edit-photoshoot/:id', name: 'Edit Photoshoot', element: EditPhotoshoot },
  { path: '/photoshoot/post-images-list/:id', name: 'Image List', element: PhotoshootImageList },
  { path: '/photoshoot/post-images-add/:id', name: 'Add Image', element: PhotoshootAddImage },
  { path: '/tv', name: 'TV', element: TvCategories, exact: true },
  { path: '/tv/categories', name: 'Categories', element: TvCategories },
  { path: '/tv/add-categories', name: 'Add Categories', element: TvAddCategories },
  { path: '/tv/edit-categories/:id', name: 'Edit Categories', element: TvEditCategories },
  { path: '/tv/videos', name: 'Videos', element: TvVideos },
  { path: '/tv/add-videos', name: 'Add Videos', element: TvAddVideo },
  { path: '/tv/edit-videos/:id', name: 'Edit Videos', element: TvEditVideo },
  { path: '/banners/advertize-list', name: 'Banners', element: AddBanners, exact: true },
  { path: '/banners/add-advertize', name: 'Advertize List', element: AddBanners },
  { path: '/banners/add-pieces', name: 'Add Advertize', element: AddBanners },
  { path: '/slider', name: 'Slider', element: SliderList, exact: true },
  { path: '/slider/slider-list', name: 'Slider List', element: SliderList },
  { path: '/slider/add-slider', name: 'Add Slider', element: AddSlider },
  { path: '/slider/edit-slider/:id', name: 'Edit Slider', element: EditSlider },
  { path: '/request', name: 'Request', element: ContactList, exact: true },
  { path: '/request/contact-list', name: 'Contact Requests', element: ContactList },
  { path: '/request/supscription-list', name: 'Newsletter Supscriptions', element: SupscriptionList },
  { path: '/magazine', name: 'Magazines', element: MagazineList, exact: true },
  { path: '/magazine/magazine-list', name: 'Magazine List', element: MagazineList },
  { path: '/magazine/add-magazine', name: 'Add Magazine', element: AddMagazine },
  { path: '/magazine/edit-magazine/:id', name: 'Edit Magazine', element: EditMagazine },
  { path: '/magazine/post-images-list/:id', name: 'Image List', element: MagazineImageList },
  { path: '/magazine/post-images-add/:id', name: 'Add Image', element: MagazineAddImage },
  { path: '/settings', name: 'Settings', element: SettingList, exact: true },
  { path: '/settings/setting-list', name: 'Settings List', element: SettingList },
  { path: '/settings/add-setting', name: 'Add Setting', element: AddSetting },
  { path: '/settings/edit-setting/:id', name: 'Add Setting', element: EditSetting },
]

export default routes
