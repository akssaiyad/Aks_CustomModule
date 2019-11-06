<?php
namespace Aks\Customemodule\Block;

class Customemodule extends \Magento\Framework\View\Element\Template
{    
    protected $_productCollectionFactory;    
        
    public function __construct(
        \Magento\Backend\Block\Template\Context $context,        
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory, 
        \Magento\Catalog\Block\Product\Context $contextImage,  
        \Magento\Catalog\Helper\Image $imageHelper,  
        \Magento\Store\Model\StoreManagerInterface $storemanager,   
        array $data = []
    )
    {    
        $this->_productCollectionFactory = $productCollectionFactory; 
        $this->imageBuilder = $contextImage->getImageBuilder();  
        $this->imageHelper =  $imageHelper;
        $this->storemanager = $storemanager;
        parent::__construct($context, $data);   
    }
    
    public function getProductCollection()
    {
    	//echo "Success";
        $collection = $this->_productCollectionFactory->create();
        $collection->addAttributeToSelect('*');
        $collection->addFieldToFilter('home_page_show_product',true);
        //$collection->setPageSize(3); // fetching only 3 products         
        return $collection;
    }
    public function getImage($product, $imageId, $attributes = [])
    {
        return $this->imageBuilder->setProduct($product)
            ->setImageId($imageId)
            ->setAttributes($attributes)
            ->create();   
    }

    public function getImageHelper(){
        return $this->imageHelper;
    }

    public function getStoreManager(){
        return $this->storemanager;
    }
}
