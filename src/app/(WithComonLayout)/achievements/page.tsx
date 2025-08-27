import Achievement from '@/components/module/home/Achievement/Achievement';
import Breadcrumb from '@/components/shared/Breadcrumb';
import React from 'react';

const page = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
            {/* Breadcrumb Section */}
            <Breadcrumb
                items={[
                    {
                        label: "Achievements",
                    },
                ]}
            />
            
            {/* Main Content */}
            <div className="pt-12 pb-12">
                <Achievement />
            </div>
        </div>
    );
};

export default page;