import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilWatch,
  cilCamera,
  cilMovie,
  cilStarHalf,
  cilCameraControl,
  cilVideo,
  cilGlobeAlt,
  cilTv,
  cilCloudDownload,
  cilScreenDesktop,
  cilDiamond,
  cilSettings,
  cilStar,
  cilNewspaper,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Main Components',
  },
  {
    component: CNavGroup,
    name: 'CMS',
    to: '/cms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CMS Page List',
        to: '/cms/cms-list',
      },
      {
        component: CNavItem,
        name: 'Add CMS Page',
        to: '/cms/add-cms',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Watches',
    to: '/watches',
    icon: <CIcon icon={cilWatch} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Categories List',
        to: '/watches/categories',
      },
      {
        component: CNavItem,
        name: 'Add Categories',
        to: '/watches/add-categories',
      },
      {
        component: CNavItem,
        name: 'Posts List',
        to: '/watches/posts',
      },
      {
        component: CNavItem,
        name: 'Add Posts',
        to: '/watches/add-posts',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Jewelry',
    to: '/jewelry',
    icon: <CIcon icon={cilDiamond} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Categories',
        to: '/jewelry/add-categories',
      },
      {
        component: CNavItem,
        name: 'Add Posts',
        to: '/jewelry/add-posts',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Events',
    to: '/events',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Events List',
        to: '/events/events-list',
      },
      {
        component: CNavItem,
        name: 'Add Events',
        to: '/events/add-events',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Lifestyle',
    to: '/lifestyle',
    icon: <CIcon icon={cilCameraControl} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Lifesylte List',
        to: '/lifestyle/lifestyle-list',
      },
      {
        component: CNavItem,
        name: 'Add Lifesylte',
        to: '/lifestyle/add-lifestyle',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'News',
    to: '/news',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Categories List',
        to: '/news/categories',
      },
      {
        component: CNavItem,
        name: 'Add Categories',
        to: '/news/add-categories',
      },
      {
        component: CNavItem,
        name: 'Posts List',
        to: '/news/news',
      },
      {
        component: CNavItem,
        name: 'Add Posts',
        to: '/news/add-news',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Celebrity',
    to: '/celebrity',
    icon: <CIcon icon={cilStarHalf} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Categories List',
        to: '/celebrity/categories-list',
      },
      {
        component: CNavItem,
        name: 'Add Categories',
        to: '/celebrity/add-categories',
      },
      {
        component: CNavItem,
        name: 'Celebrity List',
        to: '/celebrity/celebrities-list',
      },
      {
        component: CNavItem,
        name: 'Add Celebrity',
        to: '/celebrity/add-celebrities',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pieces',
    to: '/pieces',
    icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Pieces',
        to: '/pieces/add-pieces',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Photoshoot',
    to: '/photoshoot',
    icon: <CIcon icon={cilCamera} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Photoshoot List',
        to: '/photoshoot/photoshoot-list',
      },
      {
        component: CNavItem,
        name: 'Add Photoshoot',
        to: '/photoshoot/add-photoshoot',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'TV',
    to: '/tv',
    icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Categories List',
        to: '/tv/categories',
      },
      {
        component: CNavItem,
        name: 'Add Categories',
        to: '/tv/add-categories',
      },
      {
        component: CNavItem,
        name: 'Video List',
        to: '/tv/videos',
      },
      {
        component: CNavItem,
        name: 'Add Video',
        to: '/tv/add-videos',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Banners',
    to: '/banners',
    icon: <CIcon icon={cilTv} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Advertize',
        to: '/banners/advertize-list',
      },
      {
        component: CNavItem,
        name: 'Add Advertize',
        to: '/banners/add-advertize',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Slider',
    to: '/slider',
    icon: <CIcon icon={cilMovie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Slider List',
        to: '/slider/slider-list',
      },
      {
        component: CNavItem,
        name: 'Add Slider',
        to: '/slider/add-slider',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Requests',
    to: '/request',
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Contact Requests',
        to: '/request/contact-list',
      },
      {
        component: CNavItem,
        name: 'Newsletter Supscriptions',
        to: '/request/supscription-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Magazines',
    to: '/magazine',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Magazines List',
        to: '/magazine/magazine-list',
      },
      {
        component: CNavItem,
        name: 'Add Magazine',
        to: '/magazine/add-magazine',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Setting List',
        to: '/settings/setting-list',
      },
      {
        component: CNavItem,
        name: 'Add Setting',
        to: '/settings/add-setting',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Base',
  //   to: '/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
]
export default _nav
